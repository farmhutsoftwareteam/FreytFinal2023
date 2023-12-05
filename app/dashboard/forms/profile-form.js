import React, { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/profile';
import { supabase } from '@/config/supabase';

const UserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const profile = useProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setFormData({
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      phoneNumber: profile?.phoneNumber || '',
    });
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const userID = profile?.id || 'defaultID';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phoneNumber: formData.phoneNumber,
        })
        .eq('id', userID);

      if (error) throw error;

      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md">
      <form onSubmit={handleSubmit}>
      <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">General Details</h2>
          
          {/* Repeat this div for each input field, replacing the name, placeholder, etc. */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First  Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="mt-1 p-2 border border-gray-300 w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={formData.firstName ? formData.firstName : 'Enter your First Name'}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Last  Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="mt-1 p-2 border border-gray-300 w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={formData.lastName ? formData.lastName : 'Enter your Last Name' }
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* ... other input fields ... */}

          <h2 className="text-lg font-semibold text-gray-700 mt-6">Contact Details</h2>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="mt-1 p-2 border border-gray-300 w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={formData.phoneNumber ? formData.phoneNumber : 'Enter your Phone Number'}
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>


          {/* ... repeat for other contact details ... */}

        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              isSubmitting
                ? 'bg-blue-300'
                : submitSuccess
                ? 'bg-green-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
            }`}
            disabled={isSubmitting || submitSuccess}
          >
            {isSubmitting ? 'Loading...' : submitSuccess ? 'Success!' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
