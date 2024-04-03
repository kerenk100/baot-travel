import React, { useState/*, useEffect*/} from 'react';

function VendorForm(/*{ onSubmit, initialVendor }*/) {
  const [vendor, setVendor] = useState({
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
    rate: ''
  });

  const VendorTypes = {
    HOTELS: 'Hotels',
    RESTAURANTS: 'Restaurants'
  };

  // useEffect(() => {
  //   if (initialVendor) {
  //     setVendor(initialVendor);
  //   }
  // }, [initialVendor]);

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
  //  onSubmit(vendor);
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

  const handleRemoveTag = (index) => {
    setVendor({...vendor, tags: vendor.tags.filter((_, tagIndex) => index !== tagIndex)});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={vendor.name} onChange={handleChange} required />
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
          <input type="url" name="site" value={vendor.site} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input type="number" name="phoneNumber" value={vendor.phoneNumber} onChange={handleChange}  min="1000000000" max="9999999999"/>
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
            <input type="radio" name="rate" value={value} checked={vendor.rate === `${value}`} onChange={handleChange}/>
          </label>
        ))}
      </div>
      <div></div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default VendorForm;