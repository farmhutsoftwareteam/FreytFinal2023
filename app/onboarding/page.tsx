"use client"
import React, { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/profile';
import { supabase } from '@/config/supabase';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    organization_name: '',
    organization_phone: '',
    organization_location: '',
    organization_address: '',
    organization_website: ''
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const fieldsFilled = [formData.first_name, formData.last_name, formData.email, formData.phone].filter(Boolean).length;
      setProgress((fieldsFilled / 4) * 100);
      setIsFormFilled(fieldsFilled === 4);
    } else {
      const fieldsFilled = [formData.organization_name, formData.organization_phone, formData.organization_location, formData.organization_address, formData.organization_website].filter(Boolean).length;
      setProgress((fieldsFilled / 5) * 100);
      setIsFormFilled(fieldsFilled === 5);
    }
  }, [formData, step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const profile = useProfile();


  const handlePersonalInfoSubmit = async () => {
    // Check if user ID is available
    if (!profile.id) {
      console.error("User ID not available");
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone
      })
      .eq('id', profile.id);

    if (error) {
      console.error('Error updating user profile:', error);
    } else {
      setStep(2);
    }
  };
  const handleOrganizationInfoSubmit = async () => {
    // Check if user ID is available
    if (!profile.id) {
      console.error("User ID not available");
      return;
    }

    const { data, error } = await supabase
      .from('organizations')
      .insert([
        {
          name: formData.organization_name,
          phone: formData.organization_phone,
          location: formData.organization_location,
          address: formData.organization_address,
          website: formData.organization_website,
          user_id: profile.id
        }
      ]);

    if (error) {
      console.error('Error creating organization:', error);
    } else {
      console.log('Organization created:', data);
      window.location.href = '/dashboard';
      // Additional logic after successful organization creation
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      console.log('User Information:', formData);
      handlePersonalInfoSubmit();
     
    } else {
      handleOrganizationInfoSubmit();
      console.log('Organizational Data:', formData);
      // Add your logic for final submission here
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container w-full max-w-md p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center">{step === 1 ? 'Personal Information' : 'Organizational Information'}</h2>

          {step === 1 ? (
            // Personal Information Fields
            <div className="space-y-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="John" />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="Doe" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="john.doe@example.com" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="+123456789" pattern="^\+\d{10,15}$" title="Phone number should start with + followed by 10-15 digits." />
              </div>
            </div>
          ) : (
            // Organizational Information Fields
            <div className="space-y-4">
              <div>
                <label htmlFor="organization_name" className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input type="text" id="organization_name" name="organization_name" value={formData.organization_name} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="Acme Inc." />
              </div>

              <div>
                <label htmlFor="organization_phone" className="block text-sm font-medium text-gray-700">Organization Phone</label>
                <input type="tel" id="organization_phone" name="organization_phone" value={formData.organization_phone} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="+123456789" />
              </div>

              <div>
                <label htmlFor="organization_location" className="block text-sm font-medium text-gray-700">Organization Location</label>
                <select id="organization_location" name="organization_location" value={formData.organization_location} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3">
                  <option value="">Select Location</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>

              <div>
                <label htmlFor="organization_address" className="block text-sm font-medium text-gray-700">Organization Address</label>
                <input type="text" id="organization_address" name="organization_address" value={formData.organization_address} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="123 Business St." />
              </div>

              <div>
                <label htmlFor="organization_website" className="block text-sm font-medium text-gray-700">Organization Website</label>
                <input type="text" id="organization_website" name="organization_website" value={formData.organization_website} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 px-3"
                  placeholder="https://www.example.com" />
              </div>
            </div>
          )}

          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>

          <button type="submit" disabled={!isFormFilled} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 disabled:bg-gray-400">
            {step === 1 ? 'Next' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
