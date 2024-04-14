import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Country } from "country-state-city";
import { useMemo } from "react";
import styles from "./AddTrips.module.scss";
import { MultipleSelectTags } from "../../../components/Tags/Tags";

const TRIP_TAGS_OPTIONS = [
  "Families",
  "Friends",
  "Romantic",
  "Long Trip",
  "Short Trip",
  "Expensive",
  "Low Budget",
];
export interface TripFormValues {
  name: string;
  description: string;
  tags: string[];
  country: string;
}
export const AddTrips = () => {

  const countriesMenuItems = useMemo(() => {
    return Country.getAllCountries().map((icountry) => (
      <MenuItem value={icountry.isoCode} key={icountry.isoCode}>
        <span>{icountry.flag}</span>
        <span>{icountry.name}</span>
      </MenuItem>
    ));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form action="/somewhere" className={styles.form}>
          <FormControl>
            <FormLabel>Enter your name:</FormLabel>
            <TextField name="name" />
          </FormControl>
          <FormControl>
            <InputLabel>Country</InputLabel>
            <Select
              label="country"
              placeholder="Select country"
              name="country"
              defaultValue={""}
            >
              {countriesMenuItems}
            </Select>
          </FormControl>
          <TextField
            label={"Description"}
            name="description"
            placeholder="Enter a short description of your trip..."
          />
          <MultipleSelectTags
            name={"tags"}
            label={"Tags"}
            options={TRIP_TAGS_OPTIONS}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};
