import { createClient } from '@supabase/supabase-js';

// Young Eagles Public Database (EduSitePro)
// Project ID: bppuzibjlxgfwrujzfsz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bppuzibjlxgfwrujzfsz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase anon key not found. Please add VITE_SUPABASE_ANON_KEY to your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (!error) return null;
  
  console.error('Supabase error:', error);
  
  return {
    success: false,
    message: error.message || 'Database operation failed',
    code: error.code,
    details: error.details
  };
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseAnonKey && supabaseUrl.includes('supabase.co');
};

export default supabase;
