"use client"
import React from 'react';
import { useState } from 'react';
import { supabase } from '@/config/supabase';
import { useProfile } from '@/contexts/profile';
import { useOrganization } from '@/contexts/organization';



export function OrganizationForm() {
const organization = useOrganization();
const [selectedLogoFile, setSelectedLogoFile] = useState(null);

const profile = useProfile();
const [showForm, setShowForm] = useState(false);
const userId = profile?.id || 'defaultID';
  const [logoPreview, setLogoPreview] = useState('https://via.placeholder.com/150'); // Placeholder image URL

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      // Create an object that matches the organization table structure
      const organizationData = {
        createdBy: userId,
        name: formData.get('organizationName'),
        size: formData.get('organizationSize'),
        address: formData.get('organizationAddress'),
        currency: formData.get('organizationBaseCurrency'),
        phoneNumber: formData.get('phoneNumber'),
        website: formData.get('website'),
        // For logo, you might need additional logic to handle file upload
      };

      const { data, error } = await supabase
        .from('organization')
        .insert([organizationData]);

      if (error) {
        throw error;
      }

      // Handle success - You can update state or redirect user, etc.
      console.log('Organization created:', data);
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedLogoFile(file);
      // Optionally, you can still update the preview here or wait until the upload is complete
      updateLogoPreview(file);
    }
  };

  const handleLogoUpload = async () => {
    if (selectedLogoFile) {
      // Logic to upload the file to Supabase and update the organization record
      // This could be the 'uploadLogo' function described in the previous message
      await uploadLogo(selectedLogoFile, organizationId);
      // Reset the selected file after upload
      setSelectedLogoFile(null);
    }
  };
  

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    updateLogoPreview(file);
    const logoInput = document.getElementById('logoInput');
    if (logoInput) {
      logoInput.files = event.dataTransfer.files;
    }
  }

  const updateLogoPreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }
  const handleCreateClick = () => {
    setShowForm(true);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  }
  if (!organization && !showForm) {
    return (
      <div className="text-center p-4">
        <p className="text-lg text-gray-800">
          You are not part of any organization. Please contact your administrator or create one.
        </p>
        {/* Include a link or a button to create a new organization */}
        <a onClick={handleCreateClick}  className="mt-4 inline-block p-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Create Organization
        </a>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="organizationName" className="text-sm font-medium text-gray-700">Organization Name</label>
        <input type="text"
        placeholder={organization?.name || 'Organization Name'}
        name="organizationName" id="organizationName" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
  <label htmlFor="organizationSize" className="text-sm font-medium text-gray-700">Organization Size</label>
  <select 
    name="organizationSize" 
    id="organizationSize" 
    placeholder={organization?.size || 'Organization Size'}
    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
    required
  >
    <option value="1-10">1-10</option>
    <option value="11-50">11-50</option>
    <option value="51-200">51-200</option>
  </select>
</div>


      <div className="flex flex-col">
        <label htmlFor="organizationAddress" className="text-sm font-medium text-gray-700">Organization Address</label>
        <input type="text" name="organizationAddress"
        placeholder={organization?.address || 'Organization Address'}
        id="organizationAddress" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
  <label htmlFor="organizationBaseCurrency" className="text-sm font-medium text-gray-700">Base Currency</label>
  <select 
    name="organizationBaseCurrency" 
    id="organizationBaseCurrency" 
    placeholder={organization?.currency || 'Base Currency'}
    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
    required
  >
    <option value="ZMW">Zambian Kwacha</option>
    <option value="ZAR">South African Rand</option>
    <option value="USD">United States Dollar</option>
  </select>
</div>

<div className="flex flex-col">
  <label htmlFor="organizationLogo" className="text-sm font-medium text-gray-700">Organization Logo</label>
  <div 
    onDragEnter={preventDefault}
    onDragOver={preventDefault}
    onDragLeave={preventDefault}
    onDrop={handleDrop}
    className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 text-center"
  >
    <img src={logoPreview} alt="Organization Logo" className="mx-auto h-24 w-24 object-contain" />
    <p className="text-sm text-gray-500">Drag and drop your logo here, or click to select a file</p>
    <input type="file" id="logoInput" name="organizationLogo" accept="image/*" onChange={handleFileChange} className="hidden" />
    <button onClick={handleLogoUpload} className="mt-2  p-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700">Upload Logo</button>
  </div>
</div>


      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
        <input type="tel" name="phoneNumber"
        placeholder={organization?.phoneNumber || 'Phone Number'} 
        id="phoneNumber" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="website" className="text-sm font-medium text-gray-700">Website</label>
        <input type="url" 
        placeholder={organization?.website || 'Website'}
        name="website" id="website" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      <button type="submit" className="mt-4 p-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
    </form>
  );
}
