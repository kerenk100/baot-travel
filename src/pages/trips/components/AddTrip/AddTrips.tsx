import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { Country } from "country-state-city";
import { useMemo, useState } from "react";
import styles from "./AddTrips.module.scss";
import { MultipleSelectTags } from "../../../../components/Tags/Tags";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export interface Trip {
  title: string;
  country: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  budget: number;
  startDate: string;
  endDate: string;
}

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
    tags: [],
    isPublic: false,
    budget: 0,
    startDate: "",
    endDate: "",
  };
  
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [trip, setTrip] = useState(initialState);  

  const countriesMenuItems = useMemo(() => {
    return Country.getAllCountries().map((icountry) => (
      <MenuItem value={icountry.isoCode} key={icountry.isoCode}>
        <span>{icountry.flag}</span>
        <span>{icountry.name}</span>
      </MenuItem>
    ));
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await fetch('http://localhost:8080/trips', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ...trip 
      })
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
    <div>
      <header className="App-header">
        <form className={styles.form}>
          <FormControl>
            <FormLabel>Enter trip's name:</FormLabel>
            <TextField value={trip.title} name="title" onChange={handleChange} />
          </FormControl>
          <FormControl>
            <InputLabel>Country</InputLabel>
            <Select
              label="country"
              placeholder="Select country"
              name="country"
              defaultValue={""}
              onChange={handleChange}
              value={trip.country}
            >
              {countriesMenuItems}
            </Select>
          </FormControl>
          <TextField
            label={"Description"}
            name="description"
            placeholder="Enter a short description of your trip..."
            multiline
            onChange={handleChange}
            maxRows={6}
            value={trip.description}
          /> 
          <MultipleSelectTags
            name={"tags"}
            label={"Tags"}
            options={TRIP_TAGS_OPTIONS}
            saveState={handleChange}
            tags={trip.tags}
          />
          <p>Public post: <Checkbox name="isPublic" onChange={handleChecked} checked={trip.isPublic}/></p>
          {/* TODO: replace date picker to mui */}
          <p>Please enter your budget: <input name="budget" type="number" /></p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your start date: " value={startDate} onChange={(newValue) => setStartDate(newValue)} />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your start date: " value={endDate} onChange={(newValue) => setEndDate(newValue)} />
          </LocalizationProvider>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};
