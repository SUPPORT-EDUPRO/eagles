import { supabase, handleSupabaseError } from '../config/supabase';

class DatabaseService {
  constructor() {
    // Using Supabase instead of Railway/Axios
    this.supabase = supabase;
  }

  // Register for 2026 intake
  async register2026(data) {
    try {
      const { data: result, error } = await this.supabase
        .from('registrations_2026')
        .insert([{
          parent_name: data.parentName,
          parent_email: data.parentEmail,
          parent_phone: data.parentPhone,
          child_name: data.childName,
          child_age: data.childAge,
          child_gender: data.childGender,
          preferred_program: data.preferredProgram,
          additional_notes: data.additionalNotes || '',
          registration_date: new Date().toISOString(),
          status: 'pending',
          source: 'website'
        }])
        .select()
        .single();

      if (error) {
        console.error('Registration error:', error);
        return { 
          success: false, 
          error: error.message || 'Failed to submit registration' 
        };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Registration exception:', error);
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      };
    }
  }

  // Get registration status
  async getRegistrationStatus(email) {
    try {
      const { data, error } = await this.supabase
        .from('registrations_2026')
        .select('*')
        .eq('parent_email', email)
        .order('registration_date', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return { success: true, data: null };
        }
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Subscribe to newsletter
  async subscribeNewsletter(email, name = '') {
    try {
      const { data, error } = await this.supabase
        .from('newsletter_subscribers')
        .insert([{
          email,
          name,
          subscribe_date: new Date().toISOString(),
          source: 'website',
          status: 'active'
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Contact form submission
  async submitContactForm(data) {
    try {
      const { data: result, error } = await this.supabase
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          submission_date: new Date().toISOString(),
          status: 'new'
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get available programs
  async getPrograms() {
    try {
      const { data, error } = await this.supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Submit waitlist application
  async submitWaitlist(data) {
    try {
      const { data: result, error } = await this.supabase
        .from('waitlist')
        .insert([{
          parent_name: data.parentName,
          parent_email: data.parentEmail,
          parent_phone: data.parentPhone,
          child_name: data.childName,
          child_age: data.childAge,
          preferred_start_date: data.preferredStartDate,
          preferred_program: data.preferredProgram,
          priority: data.priority || 'normal',
          submission_date: new Date().toISOString(),
          status: 'active'
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Health check
  async healthCheck() {
    try {
      const { data, error } = await this.supabase
        .from('registrations_2026')
        .select('count')
        .limit(1);

      if (error) {
        return { success: false, message: 'Database connection failed' };
      }

      return { 
        success: true, 
        message: 'Database connected',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Health check failed' 
      };
    }
  }
}

export default new DatabaseService();
