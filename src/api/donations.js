// Donations API
import { supabase } from '../lib/supabase';

export const donationApi = {
  /**
   * Create a new donation record
   * @param {Object} donationData - Donation information
   * @returns {Promise<{success: boolean, data: any, error?: string}>}
   */
  async createDonation(donationData) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([donationData])
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error creating donation:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get donation by ID
   * @param {string} donationId - Donation ID
   * @returns {Promise<{success: boolean, data: any, error?: string}>}
   */
  async getDonation(donationId) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('id', donationId)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching donation:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update donation status
   * @param {string} donationId - Donation ID
   * @param {string} status - New status
   * @returns {Promise<{success: boolean, data: any, error?: string}>}
   */
  async updateDonationStatus(donationId, status) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .update({ status })
        .eq('id', donationId)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Error updating donation status:', error);
      return { success: false, error: error.message };
    }
  }
};
