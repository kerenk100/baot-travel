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
        <div>
          {vendor.name} - {vendor.type} - {vendor.website}
          <button onClick={() => onEdit(vendor._id)}>Edit</button>
          <button onClick={() => onDelete(vendor._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SimpleVendorList;