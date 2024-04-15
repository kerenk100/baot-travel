import React, { useEffect, useState } from 'react';
import VendorForm from './VendorForm';
import SimpleVendorList from './SimpleVendorList';
import { Vendor } from './Types';

function App() {
  //http://localhost:3000/vendors/
  const [currVendor, setCurrVendor] = useState<Vendor | null>()
  const [vendors, setVendors] = useState<Vendor[]>([
    // {
    //   "_id": {
    //     "$oid": "660dab50307e77a41b436e22"
    //   },
    //   "vendorId": "1",
    //   "name": "Baot Hotel",
    //   "vendorType": "hotel",
    //   "website": "baot-hotel.com",
    //   "phoneNumber": "0543041234",
    //   "email": "baothotelforever@walla.com",
    //   "coverPhoto": null,
    //   "deal": {
    //     "id": "deal1",
    //     "vendorId": "v1",
    //     "description": "Special Offer",
    //     "link": "https://example.com/deals",
    //     "start_date": "01/01/2024",
    //     "end_date": "01/01/2025"
    //   },
    //   "photos": [],
    //   "tags": ["cool", "cheap", "seaside"],
    //   "rate": 2
    // },
    // {
    //   "_id": {
    //     "$oid": "6617a7ce7d8af9d520257580"
    //   },
    //   "vendorId": "2",
    //   "name": "Pizza Pizzi",
    //   "vendorType": "restaurant",
    //   "website": "pizzi.com",
    //   "phoneNumber": "0543211234",
    //   "email": "pz@mail.com",
    //   "coverPhoto": null,
    //   "deal": {
    //     "id": "deal1",
    //     "vendorId": "v1",
    //     "description": "Special Offer",
    //     "link": "https://example.com/deals",
    //     "start_date": "02/02/2024",
    //     "end_date": "02/02/2025"
    //   },
    //   "photos": [],
    //   "tags": ["cool", "cheap", "pizza", "food"],
    //   "rate": 3
    // }
    // Add more vendor objects here
  ]);
  useEffect(() => {
    fetch('http://localhost:3000/vendors/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setVendors(data); // Set fetched data into state
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            //setError(error.message);
        });
}, []); // The empty array ensures this effect only runs once after the initial render

  // Function to handle deleting a vendor
  const deleteVendor = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.vendorId !== id));
    //DELETE request
  };

  // Placeholder function for editing a vendor
  const editVendor = (id: string) => {
    const vendor: Vendor | undefined = vendors.find(vendor => vendor.vendorId == id)
    if (vendor) {
      console.log(vendor);
      setCurrVendor(vendor);
    }
    console.log("Editing vendor with ID:", id);
    // Implement the edit functionality here
  };

  const saveVendor = (updatedVendor: Vendor) => {
    console.log('updated vendor', updatedVendor)
    const updatedVendors = vendors.map(vendor => {
      if (vendor.vendorId === updatedVendor.vendorId) {
        //if vendor id is 0 --> post otherwise (edit) --> put
        //fetch with updatedVendor
      //   fetch(`http://localhost:3000/vendors/${updatedVendor.vendorId}`, {
      //     method: 'PUT', // or 'POST' if you are creating a new vendor
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(updatedVendor)
      // })
      // .then(response => {
      //     if (!response.ok) {
      //         throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      // })
      // .then(data => {
      //     console.log('Success:', data);
      //     // Update state only after confirmation of successful network operation
      //     const updatedVendors = vendors.map(vendor => {
      //         if (vendor.vendorId === updatedVendor.vendorId) {
      //             return updatedVendor; // Use the possibly modified vendor returned from the server
      //         }
      //         return vendor;
      //     });
  
      //     setVendors(updatedVendors);
      //     setCurrVendor(null);
      // })
      // .catch(error => {
      //     console.error('Error:', error);
      // });
        return updatedVendor;  // Return the updated vendor object
      }
      return vendor;  // Return the original vendor object
    });
    
    setVendors(updatedVendors); 
    setCurrVendor(null);
  }


  function onCreateNew(): void {
    const newVendor: Vendor = {
      _id: new Object(), // Assuming MongoDB's ObjectId for new entities; handle this on your server if needed.
      vendorId: '0',
      name: '',
      vendorType: '',
      website: '',
      phoneNumber: '',
      email: '',
      coverPhoto: null,
      deal: {
        id: '',
        vendorId: '',
        description: '',
        link: '',
        start_date: '',
        end_date: ''
      },
      photos: [],
      tags: [],
      rate: 0
    };
    setVendors([...vendors, newVendor]);
    setCurrVendor(newVendor);
  }

  return (
    
    <div className="App">
      {!currVendor && <SimpleVendorList vendors={vendors} onEdit={editVendor} onDelete={deleteVendor} />}
      {currVendor && <VendorForm initialVendor={currVendor} onSave={saveVendor}/>}
      {!currVendor && <button onClick={() => onCreateNew()}>Add new vendor</button>}
    </div>
  );
}

export default App;