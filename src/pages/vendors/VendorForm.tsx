import React, { ChangeEventHandler, useState } from "react";
import { Vendor } from "./Types";
import "./VendorForm.css";
import TagInput from "../../components/Tags/TagInput";
import CloudinaryUploadWidget from "../../components/utilities/uploadWidget/CloudinaryUploadWidget";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";


interface VendorFormProps {
  initialVendor: Vendor;
  onSave: (vendor: Vendor) => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ initialVendor, onSave }) => {
  const [vendor, setVendor] = useState<Vendor>(initialVendor);
  const [coverPhotoPublicId, setCoverPhotoPublicId] = useState<string>();
  const [additionalPhotosPublicIds, setAdditionalPhotosPublicIds] = useState<string>();

  

  if (coverPhotoPublicId) {
      vendor.coverPhoto = coverPhotoPublicId;
  }
   if (additionalPhotosPublicIds) {
      vendor.photos = additionalPhotosPublicIds;
  }

  const VendorTypes = {
    HOTELS: "Hotel",
    RESTAURANTS: "Restaurant",
  };

  const handleSimpleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVendor((vendor) => ({ ...vendor, [name]: value }));
  };

  const handleDealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name.replace("deal.", ""); // Assuming name is "deal.description" or "deal.link"
    setVendor((vendor) => ({
      ...vendor,
      deal: { ...vendor.deal, [field]: value },
    }));
  };

  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };
  /*const handleAddTag = (tag: string) => {
    if (!tag.trim()) return;
    setVendor((prevVendor) => ({
      ...prevVendor,
      tags: [...prevVendor.tags, tag.trim()],
    }));
  };*/

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO- add the tags state- to the vendor
    onSave(vendor);
    console.log("Form submitted:", vendor);
  };

  const handleTagInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const input = event.target as HTMLInputElement;
      handleAddTag(input.value);
      input.value = ""; // Clear input field after adding the tag
    }
  };

  const handleVendorTypeChange = (event: SelectChangeEvent) => {
    setVendor({ ...vendor, type: event.target.value });
  };

  /*const handleRemoveTag = (index: number) => {
    setVendor({
      ...vendor,
      tags: vendor.tags.filter((_, tagIndex) => index !== tagIndex),
    });
  };*/

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, tagIndex) => index !== tagIndex));
  };
  return (
    <form onSubmit={handleSubmit} className="form-vendor">
      <FormControl>
        <TextField
          label="Vendor name"
          name="name"
          type="text"
          value={vendor.name}
          onChange={handleSimpleChange}
          required
        />

        <FormControl>
          <InputLabel id="vendor-type-label">Vendor type</InputLabel>
          <Select
            labelId="vendor-type-label"
            value={vendor.type}
            onChange={handleVendorTypeChange}
            required
          >
            <MenuItem value={VendorTypes.HOTELS}>HOTEL</MenuItem>
            <MenuItem value={VendorTypes.RESTAURANTS}>RESTAURANT</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Website url"
          name="website"
          type="url"
          value={vendor.website}
          onChange={handleSimpleChange}
        />

        <TextField
          label="Location"
          name="location"
          type="text"
          value={vendor.location}
          onChange={handleSimpleChange}
        />

        <TextField
          label="Phone number"
          name="phoneNumber"
          type="number"
          value={vendor.phoneNumber}
          onChange={handleSimpleChange}
        />

        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={vendor.email}
          onChange={handleSimpleChange}
        />

        <TextField
          label="Deal description"
          name="deal.description"
          type="text"
          value={vendor.deal.description}
          onChange={handleDealChange}
        />

        <TextField
          label="Deal url"
          name="deal.link"
          type="url"
          value={vendor.deal.link}
          onChange={handleDealChange}
        />

        {/*<TextField
          label="Type tag and press Enter"
          name="tags"
          type="text"
          onKeyDown={handleTagInputKeyDown}
        />

        <ul>
          {vendor.tags.map((tag, index) => (
            <li key={index}>
              {tag}
              <Button
                type="submit"
                onClick={() => handleRemoveTag(index)}
                variant="contained"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>*/}

        <div>
          <TagInput
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        </div>
        <CloudinaryUploadWidget setPublicId={setCoverPhotoPublicId} buttonLabel="Upload cover photo" />
        <CloudinaryUploadWidget setPublicId={setAdditionalPhotosPublicIds} buttonLabel="Upload photos" />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default VendorForm;
