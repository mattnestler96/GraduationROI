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
import Search from "@mui/icons-material/SearchOutlined";
import React, { ChangeEvent, useContext } from "react";
import programTypes from "./programTypes";
import programs from "./programs";
import MultiSelect from "../multiSelect";
import { ITEM_LIMIT } from "../../utils/dataHelpers";
import { Programs } from "../../contexts/programs";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
  programCategory?: string[];
}

const QueryButton = () => {
  const {
    queryFilter,
    handleFetchPrograms,
  } = useContext(Programs);
  const [open, setOpen] = React.useState(false);
  const [currentFilter, setCurrentFilter] =
    React.useState<IFilter>(queryFilter);
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
    handleFetchPrograms(currentFilter);
    handleCloseDialog();
  };

  return (
    <>
      <Hidden smDown>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          style={{ margin: "0px 5px" }}
          color="primary"
          startIcon={<Search />}
        >
          Filter
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          onClick={handleOpenDialog}
          color="primary"
        >
          <Search />
        </IconButton>
      </Hidden>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>Filter Programs</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" color="GrayText" style={{ margin: 15 }}>
            {`Programs are loaded ${ITEM_LIMIT} at one time. Try narrowing your filter if programs seem missing from the list.`}
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
