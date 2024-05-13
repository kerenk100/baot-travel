import { useEffect, useState } from 'react';
import VendorForm from './VendorForm';
import SimpleVendorList from './SimpleVendorList';
import { Vendor } from './Types';
import Snackbar from '@mui/material/Snackbar';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

function VendorManager() {
  const [currVendor, setCurrVendor] = useState<Vendor | null>()
  const [vendors, setVendors] = useState<Vendor[]>([]);
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
        });
}, []);

  // Function to handle deleting a vendor
  const deleteVendor = async (id: string) => {
    
    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:3000/vendors/${id}`, {
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

  const enterEditVendorMode = async (id: string) => {
    const vendor: Vendor | undefined = vendors.find(vendor => vendor._id == id)
    if (!vendor) {
      console.error("Vendor not found with ID:", id);
      return; // Early return if the vendor is not found
    }
    setCurrVendor(vendor);
  };

  const saveVendor = async (updatedVendor: Vendor) => {
    console.log('updated vendor', updatedVendor);

    const newVendor: boolean = updatedVendor._id === "";
    // Determine the method based on whether the vendor is new or existing
    const method = newVendor ? 'POST' : 'PUT';
    const url = newVendor ? 'http://localhost:3000/vendors/' : `http://localhost:3000/vendors/${updatedVendor._id}`;

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

        setSnackBarOpen(true);
        setSnackBarText("Thank you! The vendor was successfully added :)");

      } else {
        const error = await response.text();
        throw new Error(`Failed to save vendor: ${error}`);
      }
    } catch (error) {
      console.error('Error saving vendor:', error instanceof Error ? error.message : 'An unknown error occurred');

      setSnackBarOpen(true);
      setSnackBarText("Ops! please try again :( ");
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
      coverPhoto: null,
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
      rate: 0
    };

    setCurrVendor(newVendor);
  }

  const [snackBarOpen,setSnackBarOpen] = useState(false)
  const [snackBarText,setSnackBarText] = useState("This Snackbar will be dismissed in 5 seconds.")

  return (
    
    <div className="App">
      {!currVendor && <SimpleVendorList vendors={vendors} onEdit={enterEditVendorMode} onDelete={deleteVendor} />}
      {!currVendor && <button onClick={() => onCreateNew()}>Add new vendor</button>}

      {currVendor && <VendorForm initialVendor={currVendor} onSave={saveVendor}/>}

      <Snackbar
          open={snackBarOpen}
          autoHideDuration={5000}
          onClose={()=>{setSnackBarOpen(false)}}
          message={snackBarText}
      />
    </div>
  );
}

export default VendorManager;