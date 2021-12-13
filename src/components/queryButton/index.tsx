import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { isInSampleUserMode } from "../../utils/userInfo";
import programTypes from './programTypes';
import programs from './programs';
import MultiSelect from "../multiSelect";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
  programCategory?: string[]
}

interface IQueryButton {
  onChange: (filter: IFilter) => void;
  defaultFilter: IFilter;
}

const QueryButton = (props: IQueryButton) => {
  const [open, setOpen] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState<IFilter>(
    props.defaultFilter
  );
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleDataEntry =
    (field: keyof IFilter) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleArrayDataEntry(field)(
        e.target.value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "")
      );
    };

  const handleArrayDataEntry = (field: keyof IFilter) => (value: string[]) => {
    const newFilter = { ...currentFilter };
    newFilter[field] = value;
    setCurrentFilter(newFilter);
  };

  const handleSubmitSearch = () => {
    props.onChange(currentFilter);
    handleCloseDialog();
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={isInSampleUserMode()}
        onClick={handleOpenDialog}
        style={{ margin: "0px 5px" }}
        color="primary"
      >
        Start Search
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>Search for Programs</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <MultiSelect
            onChange={handleArrayDataEntry("states")}
            value={currentFilter.states || []}
            options={["CALIFORNIA", "ARKANSAS"]}
            label="States"
          />
          <MultiSelect
            onChange={handleArrayDataEntry("programCategory")}
            value={currentFilter.programCategory || []}
            options={programTypes}
            label="Program Type"
          />
          <MultiSelect
            onChange={handleArrayDataEntry("programs")}
            value={currentFilter.programs || []}
            options={programs}
            label="Programs"
          />
          <TextField
            defaultValue={currentFilter.institutions}
            label="Comma-separated institutions (case sensitive)"
            onChange={handleDataEntry("institutions")}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button onClick={handleSubmitSearch}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
