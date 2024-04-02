import React, { useState } from 'react';

function VendorForm() {
  const [vendor, setVendor] = useState({
    name: '',
    vendorType: '',
    site: '',
    phoneNumber: '',
    email: '',
    coverPhoto: null,
    deal: {
      id: '',
      vendorId: '',
      description: '',
      link: ''
    },
    photos: [],
    tags: []
  });

  const VendorTypes = {
    HOTELS: 'Hotels',
    RESTAURANTS: 'Restaurants'
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name.includes('.')) {
      const [key, subKey] = name.split('.');
      setVendor(vendor => ({ ...vendor, [key]: { ...vendor[key], [subKey]: value }}));
    } else {
      setVendor(vendor => ({ ...vendor, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would usually send the 'vendor' state to the backend or process it as needed.
    console.log('Form submitted:', vendor);
  };

  const handleCoverPhotoChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setVendor(prevVendor => ({
        ...prevVendor,
        coverPhoto: file
      }));
    }
  };

  const handlePhotosChange = (event) => {
    // For multiple files, spread the FileList into an array and add it to the existing photos array
    const files = Array.from(event.target.files);
    setVendor(prevVendor => ({
      ...prevVendor,
      photos: [...prevVendor.photos, ...files]
    }));
  };

    const handleAddTag = (tag) => {
      // Prevent adding empty tags
      if (!tag.trim()) return;
  
      setVendor(prevVendor => ({
        ...prevVendor,
        tags: [...prevVendor.tags, tag.trim()]
      }));
    };
  
    const handleTagInputKeyDown = (event) => {
      // Check if the Enter key was pressed
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        handleAddTag(event.target.value);
        event.target.value = ''; // Clear input field after adding the tag
      }
    };

  const handleVendorTypeChange = (event) => {
    setVendor({...vendor, vendorType: event.target.value});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={vendor.name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Vendor Type
          <select value={vendor.vendorType} onChange={handleVendorTypeChange}>
            <option value="">Select Type</option>
            <option value={VendorTypes.HOTELS}>{VendorTypes.HOTELS}</option>
            <option value={VendorTypes.RESTAURANTS}>{VendorTypes.RESTAURANTS}</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Site:
          <input type="url" name="site" value={vendor.site} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={vendor.phoneNumber} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={vendor.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Cover Photo:
          <input type="file" name="coverPhoto" onChange={handleCoverPhotoChange} />
        </label>
      </div>
      <div>
        <label>
          Deal Description:
          <input type="text" name="deal.description" value={vendor.deal.description} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Deal Link:
          <input type="url" name="deal.link" value={vendor.deal.link} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Photos:
          <input type="file" name="photos" multiple onChange={handlePhotosChange} />
        </label>
      </div>
      <div>
        <label>
          Tags:
          <input type="text" onKeyDown={handleTagInputKeyDown}placeholder="Type tag and press Enter"/>
        </label>
        <ul>
          {vendor.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default VendorForm;