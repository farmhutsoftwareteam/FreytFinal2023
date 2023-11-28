"use client"
import React from 'react';
import { useState } from 'react';

export function OrganizationForm() {

  const [logoPreview, setLogoPreview] = useState('https://via.placeholder.com/150'); // Placeholder image URL

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Replace this with your submission logic
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateLogoPreview(file);
    }
  }
  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = (event as any).dataTransfer.files[0];
    updateLogoPreview(file);
    const logoInput = document.getElementById('logoInput') as HTMLInputElement;
    if (logoInput) {
      logoInput.files = event.dataTransfer.files;
    }
  }

  const updateLogoPreview = (file : File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setLogoPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
    
  }

  const preventDefault = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="organizationName" className="text-sm font-medium text-gray-700">Organization Name</label>
        <input type="text" name="organizationName" id="organizationName" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="organizationSize" className="text-sm font-medium text-gray-700">Organization Size</label>
        <input type="number" name="organizationSize" id="organizationSize" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="organizationAddress" className="text-sm font-medium text-gray-700">Organization Address</label>
        <input type="text" name="organizationAddress" id="organizationAddress" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="organizationBaseCurrency" className="text-sm font-medium text-gray-700">Base Currency</label>
        <input type="text" name="organizationBaseCurrency" id="organizationBaseCurrency" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
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
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
        <input type="tel" name="phoneNumber" id="phoneNumber" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="website" className="text-sm font-medium text-gray-700">Website</label>
        <input type="url" name="website" id="website" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      <button type="submit" className="mt-4 p-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
    </form>
  );
}
