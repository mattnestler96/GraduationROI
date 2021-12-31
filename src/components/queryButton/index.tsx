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
  StepIconProps,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/SearchOutlined";
import States from "@mui/icons-material/Map";
import Institutions from "@mui/icons-material/LocationCity";
import Program from "@mui/icons-material/HistoryEdu";
import ProgramCategory from "@mui/icons-material/School";
import React, { ChangeEvent, useContext } from "react";
import programTypes from "./programTypes";
import programs from "./programs";
import MultiSelect from "../multiSelect";
import { Programs } from "../../contexts/programs";

interface IFilter {
  states?: string[];
  programs?: string[];
  institutions?: string[];
  programCategory?: string[];
}

const StepIcon =
  (Icon: React.ReactElement) =>
  (props: StepIconProps): JSX.Element => {
    const { completed } = props;
    return completed ? React.cloneElement(Icon, { color: "primary" }) : Icon;
  };

const QueryButton = () => {
  const { queryFilter, handleFetchPrograms } = useContext(Programs);
  const [open, setOpen] = React.useState(true);
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
          Start Search
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
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel
                onClick={() => setActiveStep(0)}
                StepIconComponent={StepIcon(<States />)}
              >
                {`States ${
                  currentFilter.states?.length
                    ? ` (${currentFilter.states?.length})`
                    : ""
                }`}
              </StepLabel>
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
              <StepLabel
                onClick={handleJumpAhead(1)}
                StepIconComponent={StepIcon(<ProgramCategory />)}
              >
                {`Program Category ${
                  currentFilter.programCategory?.length
                    ? ` (${currentFilter.programCategory?.length})`
                    : ""
                }`}
              </StepLabel>
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
              <StepLabel
                onClick={handleJumpAhead(2)}
                StepIconComponent={StepIcon(<Program/>)}
              >
                {`Program Name ${
                  currentFilter.programs?.length
                    ? ` (${currentFilter.programs?.length})`
                    : ""
                }`}
              </StepLabel>
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
              <StepLabel
                onClick={handleJumpAhead(3)}
                StepIconComponent={StepIcon(<Institutions/>)}
              >
                {`Institution ${
                  currentFilter.institutions?.length
                    ? ` (${currentFilter.institutions?.length})`
                    : ""
                }`}
              </StepLabel>
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
          <Button
            disabled={!currentFilter.states?.length}
            onClick={handleSubmitSearch}
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
