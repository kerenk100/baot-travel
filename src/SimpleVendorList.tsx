import React from 'react';
import { Vendor } from './Types';

// Define the props interface
interface SimpleVendorListProps {
  vendors: Vendor[];
  onEdit: (id: string) => void; // Assuming onEdit needs only the id to perform edit
  onDelete: (id: string) => void;
}

// Define the component using the props interface
const SimpleVendorList: React.FC<SimpleVendorListProps> = ({ vendors, onEdit, onDelete }) => {
  return (
    <div>
      {vendors.map((vendor) => (
        <div key={vendor.vendorId}>
          {vendor.name} - {vendor.vendorType} - {vendor.website}
          <button onClick={() => onEdit(vendor.vendorId)}>Edit</button>
          <button onClick={() => onDelete(vendor.vendorId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SimpleVendorList;