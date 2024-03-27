import React, { useState } from 'react';

function VendorForm() {
  const [vendor, setVendor] = useState({
    name: '',
    vendorType: '',
    site: '',
    phoneNumber: '',
    email: '',
    coverPhoto: '',
    photos: [],
    deal: {
      id: '',
      vendorId: '',
      description: '',
      link: ''
    },
    tags: []
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVendor({ ...vendor, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would usually send the 'vendor' state to the backend or process it as needed.
    console.log(vendor);
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
          Vendor Type:
          <input type="text" name="vendorType" value={vendor.vendorType} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Site:
          <input type="text" name="site" value={vendor.site} onChange={handleChange} />
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
          Cover Photo URL:
          <input type="text" name="coverPhoto" value={vendor.coverPhoto} onChange={handleChange} />
        </label>
      </div>
      {vendor.photos.map((photo, index) => (
        <div key={index}>
          <label>
            Photo {index + 1} URL:
            <input
              type="text"
              name="photos"
              value={photo}
              onChange={(e) => handleArrayChange(e, index, "photos")}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("photos")}>Add Photo</button>
      {vendor.tags.map((tag, index) => (
        <div key={index}>
          <label>
            Tag {index + 1}:
            <input
              type="text"
              name="tags"
              value={tag}
              onChange={(e) => handleArrayChange(e, index, "tags")}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={() => addArrayField("tags")}>Add Tag</button>
      <div>
        <label>
          Deal Description:
          <input
            type="text"
            name="deal.description"
            value={vendor.deal.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Deal Link:
          <input
            type="text"
            name="deal.link"
            value={vendor.deal.link}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default VendorForm;