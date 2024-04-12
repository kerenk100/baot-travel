import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

export const AddTrips = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FormControl>
          <FormLabel>Enter your name:</FormLabel>
          <TextField />
          <Button variant="contained">Submit</Button>
        </FormControl>
      </header>
    </div>
  );
}