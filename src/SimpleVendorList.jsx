import React from 'react';

function SimpleVendorList(props) {
  return (
    <ul className="vendors-list">
      {props.vendors.map((vendor, index) => (
        <li key={index} className="vendor-item">
          <strong>{vendor.name}</strong> - {vendor.vendorType}
        </li>
      ))}
    </ul>
  );
}

export default SimpleVendorList;
