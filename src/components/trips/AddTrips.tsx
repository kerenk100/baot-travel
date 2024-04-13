import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const AddTrips = () => {

const globalState = {
  budget: '',
  startDate: '',
  endDate: ''
};

const [state, setState] = useState(globalState);

  return (
   
        <FormControl>
          <FormLabel>Enter your name:</FormLabel>
          <TextField />

          <div>
          <p>Public post: <Checkbox {...label} defaultChecked /></p>
          <p>Please enter your budget: <input value={state.budget}   name="budget" type="number" onChange={e => setState({...state, budget: e.target.value})} /></p>
          <p>Please enter your start date: <input value={state.startDate}   name="startDate" type="date" onChange={e => setState({...state, startDate: e.target.value})} /></p>
          <p>Please enter your end date: <input value={state.endDate}   name="endDate" type="date" onChange={e => setState({...state, endDate: e.target.value})} /></p>
          </div>

          <Button variant="contained">Submit</Button>
        </FormControl>

  );
}