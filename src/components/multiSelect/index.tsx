import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IMultiSelect {
  value: string[];
  onChange: (v: string[]) => void;
  label?: string;
  options: string[];
  disabled?: boolean;
}

const MultiSelect = ({
  value,
  onChange,
  label,
  options,
  disabled,
}: IMultiSelect) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }} disabled={disabled}>
      <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        multiple
        value={value}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
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

export default MultiSelect;
