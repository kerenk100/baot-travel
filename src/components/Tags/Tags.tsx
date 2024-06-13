import React from "react";

import { Autocomplete, TextField, Chip, FormControl} from "@mui/material";
export interface MultipleSelectTagsProps {
  options: string[];
  label: string;
  saveState: (tage: string[]) => void;
  tags: string[];
}
export const MultipleSelectTags: React.FC<MultipleSelectTagsProps> = ({
  options,
  label,
  saveState,
  tags,
}) => {

  const handleChange = (_event: React.SyntheticEvent, value: string[], _reason: string) => {
    saveState(value);
  };

  return (
    <FormControl>
      <Autocomplete
        multiple
        id="multiple-tag"
        options={options}
        freeSolo
        onChange={handleChange}
        value={tags}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} id="select-multiple-chip" label={label} />
        )}
      />
    </FormControl>
  );
};
