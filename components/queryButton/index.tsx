import { Button, Dialog, DialogActions, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
}

interface IQueryButton {
  onChange: (filter: IFilter) => void;
}

const QueryButton = (props: IQueryButton) => {
  const [open, setOpen] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState<IFilter>({
    states: ["CALIFORNIA"],
    programs: ["Chem"],
    institutions: ['Berk']
  });
  const handleToggleDialog = () => {
    setOpen(!open);
  };
  const handleDataEntry =
    (field: keyof IFilter) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newFilter = { ...currentFilter };
      newFilter[field] = e.target.value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "");
      setCurrentFilter(newFilter);
    };

  const handleSubmitSearch = () => {
    props.onChange(currentFilter);
    handleToggleDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggleDialog}>
        Query
      </Button>
      <Dialog open={open} onClose={handleToggleDialog}>
        <TextField
          defaultValue={currentFilter.states}
          placeholder="comma seperated states"
          onChange={handleDataEntry("states")}
        />
        <TextField
          defaultValue={currentFilter.programs}
          placeholder="comma seperated programs"
          onChange={handleDataEntry("programs")}
        />
        <TextField
          defaultValue={currentFilter.institutions}
          placeholder="comma seperated institutions"
          onChange={handleDataEntry("institutions")}
        />
        <DialogActions>
          <Button onClick={handleSubmitSearch}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
