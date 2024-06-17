import { useMemo } from "react";
import { Country, City } from "country-state-city";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";

export interface LocationFormItemProps extends FormControlProps {
  type: "city" | "country";
  handleChange: (event: any) => void;
  value: string;
  /**
   * Relevant for city
   */
  parentLocation?: string;
}

export const LocationFormItem: React.FC<LocationFormItemProps> = ({
  handleChange,
  value,
  type,
  parentLocation,
  ...props
}) => {
  const countriesMenuItems = useMemo(() => {
    return Country.getAllCountries().map((icountry) => (
      <MenuItem value={icountry.isoCode} key={icountry.isoCode}>
        <span>{icountry.flag}</span>
        <span>{icountry.name}</span>
      </MenuItem>
    ));
  }, []);

  const cityMenuItems = useMemo(() => {
    const cities = parentLocation
      ? City.getCitiesOfCountry(parentLocation)
      : [];
    return cities?.map((icity, idx) => {
      return (
        <MenuItem value={`${icity.name}`} key={`${idx}`}>
          <span>{icity.name}</span>
        </MenuItem>
      );
    });
  }, [parentLocation]);

  return (
    <Tooltip title={type==='city' && !parentLocation && "You must first select a country before selecting city"}>
    <FormControl {...props}>
      <InputLabel style={{ textTransform: "capitalize" }}>{type}</InputLabel>
      <Select
        label={type}
        placeholder={`Select ${type}`}
        name={type}
        defaultValue={""}
        onChange={handleChange}
        value={value}
        disabled={type === "city" && !parentLocation}
      >
        {type === "country" ? countriesMenuItems : cityMenuItems}
      </Select>
    </FormControl>
    </Tooltip>
  );
};
