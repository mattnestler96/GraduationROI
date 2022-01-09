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
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Search from "@mui/icons-material/SearchOutlined";
import States from "@mui/icons-material/Map";
import Program from "@mui/icons-material/HistoryEdu";
import ProgramCategory from "@mui/icons-material/School";
import React, { useContext } from "react";
import programTypes from "./programTypes";
import programs from "./programToType";
import MultiSelect from "../multiSelect";
import { Programs } from "../../contexts/programs";
import { isInSampleUserMode } from "../../utils/userInfo";

const getPrograms = (filter?: string[]): string[] => {
  if (!filter || !filter.length) {
    return Object.keys(programs).sort();
  }
  return filter
    .map((s) => programTypes[s])
    .flat()
    .sort();
};

interface IFilter {
  states?: string[];
  programs?: string[];
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
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
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="query_click"
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
        fullScreen={matches}
        maxWidth="md"
      >
        <DialogTitle>Start Search</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <Paper style={{ padding: 10, margin: 10 }}>
            <Typography variant="h6" color="primary">
              Welcome to GraduationROI!
            </Typography>
            <Typography>
              We'll help you get a glimpse of your life after graduation.
            </Typography>
            <Typography>
              Tell us a little about what programs you are interested in.
            </Typography>
            {isInSampleUserMode() && (
              <Typography color="textSecondary" variant="caption">
                (Results size limited. Sign in to view all results.)
              </Typography>
            )}
          </Paper>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel
                onClick={() => setActiveStep(0)}
                StepIconComponent={StepIcon(<States />)}
              >
                {`States (required)${
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
                    "GEORGIA",
                    "IOWA",
                    "KANSAS",
                    "LOUISIANA",
                    "MARYLAND",
                    "MISSOURI",
                    "NEBRASKA",
                    "NEVADA",
                    "TEXAS",
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
                {`Area of Focus ${
                  currentFilter.programCategory?.length
                    ? ` (${currentFilter.programCategory?.length})`
                    : ""
                }`}
              </StepLabel>
              <StepContent>
                <MultiSelect
                  onChange={handleArrayDataEntry("programCategory")}
                  value={currentFilter.programCategory || []}
                  options={Object.keys(programTypes).sort()}
                  label="Area of Focus"
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
                StepIconComponent={StepIcon(<Program />)}
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
                  options={getPrograms(currentFilter.programCategory)}
                  label="Programs"
                  onClear={() => handleArrayDataEntry("programs")([])}
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
