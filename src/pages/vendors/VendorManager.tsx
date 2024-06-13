import { useEffect, useState } from 'react';
import { Vendor } from './Types';
import VendorList from './VendorList';
import VendorForm from './VendorForm';
import { useAppContext } from '../../App.context';

function VendorManager() {
  const [currVendor, setCurrVendor] = useState<Vendor | null>()
  const [vendors, setVendors] = useState<Vendor[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/vendors/')
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
        });
}, []);

  // Function to handle deleting a vendor
  const deleteVendor = async (id: string) => {
    
    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:8080/vendors/${id}`, {
        method: 'DELETE'
      });
  
      // Check if the DELETE was actually successful
      if (!response.ok) {
        // If the DELETE was not successful, handle the error
        const message = await response.text(); // or response.json() if the server sends JSON
        console.error(`Failed to delete vendor: ${message}`);
        throw new Error(message); // Re-throw to handle it outside or for further error handling logic
      } else {
        setVendors(vendors.filter(vendor => vendor._id !== id));
        console.log(`Vendor deleted successfully with ID: ${id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error making DELETE request:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const saveVendor = async (updatedVendor: Vendor) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    console.log('updated vendor', updatedVendor);

    const newVendor: boolean = updatedVendor._id === "";
    // Determine the method based on whether the vendor is new or existing
    const method = newVendor ? 'POST' : 'PUT';
    const url = newVendor ? 'http://localhost:8080/vendors/' : `http://localhost:8080/vendors/${updatedVendor._id}`;

    if (newVendor) {
      // Set the owner of the new vendor to the current user
      updatedVendor.owner = user?.id;
    }
 
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVendor)
      });
  
      if (response.ok) {
        const message = await response.text();

        // Update the local state accordingly
        if (newVendor) {
                    // If new vendor, add it to the list with a new ID (assumed returned by server or managed client-side)
          setVendors([...vendors, {...updatedVendor, _id: message.split(' ')[7]}]); // Extract ID from message

        } else {
          // If updating, modify the existing vendor in the list
          setVendors(vendors.map(vendor => vendor._id === updatedVendor._id ? updatedVendor : vendor));
        }

      } else {
        const error = await response.text();
        throw new Error(`Failed to save vendor: ${error}`);
      }
    } catch (error) {
      console.error('Error saving vendor:', error instanceof Error ? error.message : 'An unknown error occurred');
    }

    setCurrVendor(null);
  };


  function onCreateNew(): void {
    const newVendor: Vendor = {
      _id: "",
      name: '',
      type: '',
      website: '',
      phoneNumber: '',
      location: '',
      email: '',
      coverPhoto: '',
      deal: {
        _id: new Object(),
        vendorId: '',
        description: '',
        link: '',
        startDate: '',
        endDate: ''
      },
      photos: [],
      tags: [],
      rate: 0,
      owner: ''
    };

    setCurrVendor(newVendor);
  }

  return (
    
    <div className="App">

      {currVendor && <VendorForm initialVendor={currVendor} onSave={saveVendor} />}
      {<button onClick={() => onCreateNew()}>Add new vendor</button>}
      {<VendorList initialVendors={vendors} onSave={saveVendor} onDelete={deleteVendor}/>}
    </div>
  );
}

export default VendorManager;