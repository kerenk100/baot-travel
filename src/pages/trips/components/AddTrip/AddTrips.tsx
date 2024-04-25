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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



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
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const countriesMenuItems = useMemo(() => {
    return Country.getAllCountries().map((icountry) => (
      <MenuItem value={icountry.isoCode} key={icountry.isoCode}>
        <span>{icountry.flag}</span>
        <span>{icountry.name}</span>
      </MenuItem>
    ));
  }, []);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

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
          {/* <TextField
            label={"Description"}
            name="description"
            placeholder="Enter a short description of your trip..."
            multiline
            maxRows={8}
          /> */}
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
          <MultipleSelectTags
            name={"tags"}
            label={"Tags"}
            options={TRIP_TAGS_OPTIONS}
          />
          <p>Public post: <Checkbox name="is_public" /></p>
          {/* TODO: replace date picker to mui */}
          <p>Please enter your budget: <input name="budget" type="number" /></p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your start date: " value={startDate} onChange={(newValue) => setStartDate(newValue)} />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Please enter your start date: " value={endDate} onChange={(newValue) => setEndDate(newValue)} />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};
