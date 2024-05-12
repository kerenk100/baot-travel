import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";

import { useState } from "react";
import styles from "./AddTrips.module.scss";
import { MultipleSelectTags } from "../../../../components/Tags/Tags";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocationFormItem } from "../../../../components/utilities/formUtils/LocationFromItem/LocationFormItem";

import { Trip } from "../../types";
import CloudinaryUploadWidget from "../../../../components/utilities/uploadWidget/CloudinaryUploadWidget";

export const TRIP_TAGS_OPTIONS = [
  "Families",
  "Friends",
  "Romantic",
  "Long Trip",
  "Short Trip",
  "Expensive",
  "Low Budget",
];

export const AddTrips = () => {
  const initialState : Trip = {
    title: "",
    country: "",
    description: "",
    image: "",
    tags: [],
    isPublic: false,
    budget: 0,
    startDate: "",
    endDate: "",
  };
  
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [trip, setTrip] = useState(initialState);  
  const [publicId, setPublicId] = useState("");


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let data = trip;
    if (publicId) {
      data.image = publicId;
    }
    await fetch('http://localhost:8080/trips', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    setTrip(initialState);
  };

  const handleChange = (event: any) => {
    setTrip({
      ...trip,
      [event.target.name]: event.target.value
    });
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrip({
      ...trip,
      isPublic: event.target.checked
    });
  };

  return (
    <div className={styles.container}>
      <header className="App-header">
        <h2>Add a new trip:</h2>
        <form className={styles.form}>
          <FormControl>
            <TextField
                label="Trip's Name"
                name="title"
                multiline
                onChange={handleChange}
                value={trip.title}
                required
            />
          </FormControl>
          <LocationFormItem type="country" value={trip.country} handleChange={handleChange}/>
          <TextField
            label="Description"
            name="description"
            placeholder="Enter a short description of your trip..."
            multiline
            onChange={handleChange}
            maxRows={6}
            value={trip.description}
            required
          /> 
          <MultipleSelectTags
            name={"tags"}
            label={"Tags"}
            options={TRIP_TAGS_OPTIONS}
            saveState={handleChange}
            tags={trip.tags}
          />
          <FormControlLabel 
            control={<Checkbox
                      checked={trip.isPublic}
                      onChange={handleChecked}
                      name="isPublic"
                    />}
            label="Public post">
          </FormControlLabel>
          <TextField
            label={"Budget"}
            name="budget"
            placeholder="Enter a number for the budget"
            onChange={handleChange}
            maxRows={6}
            value={trip.budget}
            required
          />           
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your start date: " value={startDate} onChange={(newValue) => setStartDate(newValue)} />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your end date: " value={endDate} onChange={(newValue) => setEndDate(newValue)} />
          </LocalizationProvider>
          <CloudinaryUploadWidget setPublicId={setPublicId}/>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};
