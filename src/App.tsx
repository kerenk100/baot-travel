import React from 'react';
import VendorForm from './VendorForm';
import SimpleVendorList from './SimpleVendorList';

function App() {
  return (
    <div className="App">
      <SimpleVendorList vendors={[
    {
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
      rate: '2'
    },
    {
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
      rate: '5'
    }
    // Add more vendor objects here
  ]}/>
  <VendorForm />
    </div>
    
  );
}

export default App;