import React, { useState } from 'react';
import { Vendor } from './Types';

function VendorForm() {
  const [vendor, setVendor] = useState<Vendor>({
    id: '',
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
    tags: [],
    rate: 0
  });

  const VendorTypes = {
    HOTELS: 'Hotels',
    RESTAURANTS: 'Restaurants'
  };

  const handleSimpleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setVendor(vendor => ({ ...vendor, [name]: value }));
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(event.target.value, 10);
    setVendor(vendor => ({ ...vendor, rate: numericValue }));
  };

  const handleDealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name.replace("deal.", ""); // Assuming name is "deal.description" or "deal.link"
    setVendor(vendor => ({
      ...vendor,
      deal: { ...vendor.deal, [field]: value }
    }));
  };

  const handleAddTag = (tag: string) => {
    if (!tag.trim()) return;
    setVendor(prevVendor => ({
      ...prevVendor,
      tags: [...prevVendor.tags, tag.trim()]
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', vendor);
  };

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setVendor(prevVendor => ({ ...prevVendor, coverPhoto: file }));
    }
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setVendor(prevVendor => ({ ...prevVendor, photos: [...prevVendor.photos, ...files] }));
    }
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const input = event.target as HTMLInputElement;
      handleAddTag(input.value);
      input.value = ''; // Clear input field after adding the tag
    }
  };

  const handleVendorTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVendor({ ...vendor, vendorType: event.target.value });
  };

  const handleRemoveTag = (index: number) => {
    setVendor({ ...vendor, tags: vendor.tags.filter((_, tagIndex) => index !== tagIndex) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={vendor.name} onChange={handleSimpleChange} required />
        </label>
      </div>
      <div>
        <label>
          Vendor Type
          <select value={vendor.vendorType} onChange={handleVendorTypeChange} required>
            <option value="">Select Type</option>
            <option value={VendorTypes.HOTELS}>{VendorTypes.HOTELS}</option>
            <option value={VendorTypes.RESTAURANTS}>{VendorTypes.RESTAURANTS}</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Site:
          <input type="url" name="site" value={vendor.site} onChange={handleSimpleChange} />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input type="number" name="phoneNumber" value={vendor.phoneNumber} onChange={handleSimpleChange}  min="100000000" max="9999999999"/>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={vendor.email} onChange={handleSimpleChange} />
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
          <input type="text" name="deal.description" value={vendor.deal.description} onChange={handleDealChange}/>
        </label>
      </div>
      <div>
        <label>
          Deal Link:
          <input type="url" name="deal.link" value={vendor.deal.link} onChange={handleDealChange}/>
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
        <ul>{vendor.tags.map((tag, index) => (<li key={index}>{tag}<button onClick={() => handleRemoveTag(index)}>Delete</button> {}
      </li>
    ))}
  </ul>
      </div>
      <div>
        <label>Rate:</label>
        {[...Array(6).keys()].map((value) => (
          <label key={value}>
            {value}
            <input type="radio" name="rate" value={value} checked={vendor.rate === value} onChange={handleRateChange}/>
          </label>
        ))}
      </div>
      <div></div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default VendorForm;