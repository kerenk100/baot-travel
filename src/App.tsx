import React, { useState } from 'react';
import VendorForm from './VendorForm';
import SimpleVendorList from './SimpleVendorList';
import { Vendor } from './Types';

function App() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '123456',
      name: 'Vendor 1',
      vendorType: 'Restaurants',
      site: 'https://example.com',
      phoneNumber: '123-456-7890',
      email: 'contact@example.com',
      coverPhoto: null,
      deal: {
        id: 'deal1',
        vendorId: 'v1',
        description: 'Special Offer',
        link: 'https://example.com/deals'
      },
      photos: [],
      tags: ['Wedding', 'Buffet'],
      rate: 2,
    },
    {
      id: '1234567',
      name: 'Vendor 2',
      vendorType: 'Hotels',
      site: 'https://example.com',
      phoneNumber: '123-456-7890',
      email: 'contact@example.com',
      coverPhoto: null,
      deal: {
        id: 'deal1',
        vendorId: 'v1',
        description: 'Special Offer',
        link: 'https://example.com/deals'
      },
      photos: [],
      tags: ['Wedding', 'Buffet'],
      rate: 5
    }
    // Add more vendor objects here
  ]);

  // Function to handle deleting a vendor
  const deleteVendor = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  // Placeholder function for editing a vendor
  const editVendor = (id: string) => {
    console.log("Editing vendor with ID:", id);
    // Implement the edit functionality here
  };

  return (
    <div className="App">
      <SimpleVendorList vendors={vendors} onEdit={editVendor} onDelete={deleteVendor} />
      <VendorForm />
    </div>
  );
}

export default App;