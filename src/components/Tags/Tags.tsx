import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

export interface MultipleSelectTagsProps {
  options: string[];
  label: string;
  name?: string;
}
export const MultipleSelectTags: React.FC<MultipleSelectTagsProps> = ({
  options,
  name,
  label,
}) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const value = event.target.value;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl>
      <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
      <Select
        label={label}
        name={name}
        labelId="multiple-tags-label"
        id="multiple-tag"
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Tag" />}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
