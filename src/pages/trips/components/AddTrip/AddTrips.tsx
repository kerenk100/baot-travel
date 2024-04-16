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
import { useMemo } from "react";
import styles from "./AddTrips.module.scss";
import { MultipleSelectTags } from "../../../../components/Tags/Tags";

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
  

  const countriesMenuItems = useMemo(() => {
    return Country.getAllCountries().map((icountry) => (
      <MenuItem value={icountry.isoCode} key={icountry.isoCode}>
        <span>{icountry.flag}</span>
        <span>{icountry.name}</span>
      </MenuItem>
    ));
  }, []);

  return (
    <div>
      <header className="App-header">
        <form action="http://localhost:80/trips" className={styles.form}>
          <FormControl>
            <FormLabel>Enter trip's name:</FormLabel>
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
          <p>Public post: <Checkbox name="is_public"/></p>
          {/* TODO: replace date picker to mui */}
          <p>Please enter your budget: <input name="budget" type="number" /></p>
          <p>Please enter your start date: <input name="startDate" type="date"/></p>
          <p>Please enter your end date: <input name="endDate" type="date"/></p>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};
