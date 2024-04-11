import React, { useState } from 'react';
import VendorForm from './VendorForm';
import SimpleVendorList from './SimpleVendorList';
import { Vendor } from './Types';

function App() {
  //http://localhost:3000/vendors/
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      "_id": {
        "$oid": "660dab50307e77a41b436e22"
      },
      "vendorId": "1",
      "name": "Baot Hotel",
      "vendorType": "hotel",
      "website": "baot-hotel.com",
      "phoneNumber": "0543041234",
      "email": "baothotelforever@walla.com",
      "coverPhoto": null,
      "deal": {
        "id": "deal1",
        "vendorId": "v1",
        "description": "Special Offer",
        "link": "https://example.com/deals",
        "start_date": "01/01/2024",
        "end_date": "01/01/2025"
      },
      "photos": [],
      "tags": ["cool", "cheap", "seaside"],
      "rate": 2
    },
    {
      "_id": {
        "$oid": "6617a7ce7d8af9d520257580"
      },
      "vendorId": "2",
      "name": "Pizza Pizzi",
      "vendorType": "restaurant",
      "website": "pizzi.com",
      "phoneNumber": "0543211234",
      "email": "pz@mail.com",
      "coverPhoto": null,
      "deal": {
        "id": "deal1",
        "vendorId": "v1",
        "description": "Special Offer",
        "link": "https://example.com/deals",
        "start_date": "02/02/2024",
        "end_date": "02/02/2025"
      },
      "photos": [],
      "tags": ["cool", "cheap", "pizza", "food"],
      "rate": 3
    }
    // Add more vendor objects here
  ]);

  // Function to handle deleting a vendor
  const deleteVendor = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.vendorId !== id));
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