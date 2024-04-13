import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel } from '@mui/material';
import react, { useState } from 'react';

const [textBudget, setBudget] = useState('');
const [textStartDate, setStartDate] = useState('');
const [textEndDate, setEndDate] = useState('');
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const AddTrips = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FormControl>
          <FormLabel>Enter your name:</FormLabel>
          <TextField />

          <div>
          <p>Public post: <Checkbox {...label} defaultChecked /></p>
          <p>Please enter your budget: <input value={textBudget}   name="budget" type="number" onChange={e => setBudget(e.target.value)} /></p>
          <p>Please enter your start date: <input value={textStartDate}   name="startDate" type="date" onChange={e => setStartDate(e.target.value)} /></p>
          <p>Please enter your end date: <input value={textEndDate}   name="endDate" type="date" onChange={e => setEndDate(e.target.value)} /></p>
          </div>

          <Button variant="contained">Submit</Button>
        </FormControl>
      </header>
    </div>
  );
}