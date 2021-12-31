import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Hidden,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
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
  const { queryFilter, handleFetchPrograms } = useContext(Programs);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleJumpAhead = (val: number) => () => {
    if (currentFilter.states?.length) {
      setActiveStep(val);
    }
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
        <IconButton onClick={handleOpenDialog} color="primary">
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
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel onClick={() => setActiveStep(0)}>{`States ${
                currentFilter.states?.length
                  ? ` (${currentFilter.states?.length})`
                  : ""
              }`}</StepLabel>
              <StepContent>
                <Typography>{"Pick at least one state"}</Typography>
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
                <div>
                  <Button disabled={true} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    disabled={!currentFilter.states?.length}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={() => setActiveStep(1)}>{`Program Category ${
                currentFilter.programCategory?.length
                  ? ` (${currentFilter.programCategory?.length})`
                  : ""
              }`}</StepLabel>
              <StepContent>
                <MultiSelect
                  onChange={handleArrayDataEntry("programCategory")}
                  value={currentFilter.programCategory || []}
                  options={programTypes}
                  label="Program Type"
                  onClear={() => handleArrayDataEntry("programCategory")([])}
                />
                <div>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={() => setActiveStep(2)}>{`Program Name ${
                currentFilter.programs?.length
                  ? ` (${currentFilter.programs?.length})`
                  : ""
              }`}</StepLabel>
              <StepContent>
                <MultiSelect
                  onChange={handleArrayDataEntry("programs")}
                  value={currentFilter.programs || []}
                  options={programs}
                  label="Programs"
                  onClear={() => handleArrayDataEntry("programs")([])}
                />
                <div>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={() => setActiveStep(3)}>{`Institution ${
                currentFilter.institutions?.length
                  ? ` (${currentFilter.institutions?.length})`
                  : ""
              }`}</StepLabel>
              <StepContent>
                <TextField
                  defaultValue={currentFilter.institutions}
                  label="Comma-separated institutions (case sensitive)"
                  onChange={handleDataEntry("institutions")}
                />
                <div>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitSearch}
                  >
                    Finish
                  </Button>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button onClick={handleSubmitSearch}>Finish</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
