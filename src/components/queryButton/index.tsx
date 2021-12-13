import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { isInSampleUserMode } from "../../utils/userInfo";
import MultiSelect from "../multiSelect";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
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
          <TextField
            defaultValue={currentFilter.programs}
            label="Comma-separated programs (case sensitive)"
            onChange={handleDataEntry("programs")}
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
