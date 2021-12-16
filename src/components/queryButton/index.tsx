import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Hidden,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Search from '@mui/icons-material/SearchOutlined';
import React, { ChangeEvent } from "react";
import { isInSampleUserMode } from "../../utils/userInfo";
import programTypes from "./programTypes";
import programs from "./programs";
import MultiSelect from "../multiSelect";
import { ITEM_LIMIT } from "../../App";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
  programCategory?: string[];
}

export interface IQueryButton {
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
      <Hidden smDown>
        <Button
          variant="contained"
          disabled={isInSampleUserMode()}
          onClick={handleOpenDialog}
          style={{ margin: "0px 5px" }}
          color="primary"
        >
          Start Search
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          disabled={isInSampleUserMode()}
          onClick={handleOpenDialog}
          color="primary"
        >
          <Search/>
        </IconButton>
      </Hidden>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>Search for Programs</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" color="GrayText" style={{ margin: 15 }}>
            {`Programs are limited to ${ITEM_LIMIT} at one time. Try narrowing your search if programs seem missing from the list.`}
          </Typography>
          <MultiSelect
            onChange={handleArrayDataEntry("states")}
            value={currentFilter.states || []}
            options={[
              "ALABAMA",
              "ALASKA",
              "ARIZONA",
              "ARKANSAS",
              "CALIFORNIA",
              "IOWA",
              "KANSAS",
              "MARYLAND",
              "MISSOURI",
              "NEBRASKA",
              "NEVADA",
            ]}
            label="States"
            onClear={() => handleArrayDataEntry("states")([])}
          />
          <MultiSelect
            onChange={handleArrayDataEntry("programCategory")}
            value={currentFilter.programCategory || []}
            options={programTypes}
            label="Program Type"
            onClear={() => handleArrayDataEntry("programCategory")([])}
          />
          <MultiSelect
            onChange={handleArrayDataEntry("programs")}
            value={currentFilter.programs || []}
            options={programs}
            label="Programs"
            onClear={() => handleArrayDataEntry("programs")([])}
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
