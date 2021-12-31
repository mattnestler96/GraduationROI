import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import React, { ChangeEvent } from "react";
import { UserInfo } from "../../models";
import { getUserName, isInSampleUserMode } from "../../utils/userInfo";
import { convertAWSJSON } from "../../utils/dataHelpers";

interface ICheckLabel extends CheckboxProps {
  label: string;
}
const CheckLabel = (props: ICheckLabel) => (
  <Box display="flex" alignItems="center" padding="0px 8px">
    <InputLabel>{props.label}</InputLabel>
    <Checkbox {...props} />
  </Box>
);

interface WorkingUserInfo extends Omit<UserInfo, "id"> {
  id?: string;
}

interface IUserInfoButton {
  username: string;
}

const UserInfoButton = (props: IUserInfoButton) => {
  const [open, setOpen] = React.useState(false);
  const [currentUserInfo, setCurrentUserInfo] =
    React.useState<WorkingUserInfo>();
  const [originalUserInfo, setOriginalUserInfo] = React.useState<UserInfo>();
  const dayPref = React.useMemo(
    () => convertAWSJSON(currentUserInfo?.dayPreferences) as any,
    [currentUserInfo?.dayPreferences]
  );
  const timePref = React.useMemo(
    () => convertAWSJSON(currentUserInfo?.timePreferences) as any,
    [currentUserInfo?.timePreferences]
  );
  const modalityPref = React.useMemo(
    () => convertAWSJSON(currentUserInfo?.modalityPreferences) as any,
    [currentUserInfo?.modalityPreferences]
  );
  const handleOpenDialog = () => {
    fetchUser();
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDOWChange =
    (day: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const copyDayPreferences = {
        ...dayPref,
        [day]: e.target.checked,
      };
      setCurrentUserInfo({
        ...currentUserInfo,
        dayPreferences: JSON.stringify(copyDayPreferences),
      });
    };
  const handleTimeChange =
    (time: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const copyTimePreferences = {
        ...timePref,
        [time]: e.target.checked,
      };
      setCurrentUserInfo({
        ...currentUserInfo,
        timePreferences: JSON.stringify(copyTimePreferences),
      });
    };
  const handleModalityChange =
    (modality: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const copyModalityPreferences = {
        ...modalityPref,
        [modality]: e.target.checked,
      };
      setCurrentUserInfo({
        ...currentUserInfo,
        modalityPreferences: JSON.stringify(copyModalityPreferences),
      });
    };

  const handleDataEntry =
    (field: keyof WorkingUserInfo) =>
    (
      e:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const copyCurrentUserInfo = { ...currentUserInfo };
      copyCurrentUserInfo[field] = e.target.value;
      setCurrentUserInfo(copyCurrentUserInfo);
    };

  const handleSaveUser = async () => {
    if (currentUserInfo && !currentUserInfo.id) {
      console.log("save new");
      DataStore.save(new UserInfo(currentUserInfo));
    } else if (currentUserInfo && originalUserInfo) {
      console.log("save existing");
      await DataStore.save(
        UserInfo.copyOf(originalUserInfo, (item) => {
          item.email = currentUserInfo.email;
          item.location = currentUserInfo.location;
          item.dayPreferences = dayPref;
          item.timePreferences = timePref;
          item.modalityPreferences = modalityPref;
          item.userType = currentUserInfo.userType;
        })
      );
    }
    handleCloseDialog();
  };

  const fetchUser = async () => {
    const response = await DataStore.query(UserInfo, (c) =>
      c.email("eq" as never, getUserName() as never)
    );
    setOriginalUserInfo(response[0]);
    setCurrentUserInfo({ email: getUserName(), ...response[0] });
  };

  return (
    <>
      <MenuItem
        onClick={handleOpenDialog}
        disabled={isInSampleUserMode()}
      >
        User Info
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>A little about yourself</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={currentUserInfo?.email || props.username}
            label="Email"
            onChange={handleDataEntry("email")}
          />
          <Box marginTop="5px">
            <TextField
              defaultValue={currentUserInfo?.location}
              label="Zipcode"
              onChange={handleDataEntry("location")}
            />
          </Box>
          <Box marginTop="5px">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>{"Who are you?"}</InputLabel>
              <Select
                value={currentUserInfo?.userType || "Other"}
                onChange={handleDataEntry("userType")}
                input={<OutlinedInput label={"Who are you?"} />}
              >
                {["Parent", "Student", "Counselor", "Admin", "Other"].map(
                  (name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="5px">
            <InputLabel>What days of the week would you take class?</InputLabel>
            <Box display="flex" alignItems="center">
              <CheckLabel
                label="Su"
                onChange={handleDOWChange("Sunday")}
                checked={!!dayPref.Sunday}
              />
              <CheckLabel
                label="Mo"
                onChange={handleDOWChange("Monday")}
                checked={!!dayPref.Monday}
              />
              <CheckLabel
                label="Tu"
                onChange={handleDOWChange("Tuesday")}
                checked={!!dayPref.Tuesday}
              />
              <CheckLabel
                label="We"
                onChange={handleDOWChange("Wednesday")}
                checked={!!dayPref.Wednesday}
              />
              <CheckLabel
                label="Th"
                onChange={handleDOWChange("Thursday")}
                checked={!!dayPref.Thursday}
              />
              <CheckLabel
                label="Fr"
                onChange={handleDOWChange("Friday")}
                checked={!!dayPref.Friday}
              />
              <CheckLabel
                label="Sa"
                onChange={handleDOWChange("Saturday")}
                checked={!!dayPref.Saturday}
              />
            </Box>
          </Box>
          <Box marginTop="5px">
            <InputLabel>What time of day would you take a class?</InputLabel>
            <Box display="flex" alignItems="center">
              <CheckLabel
                label="Morning"
                onChange={handleTimeChange("Morning")}
                checked={!!timePref.Morning}
              />
              <CheckLabel
                label="Mid-day"
                onChange={handleTimeChange("Midday")}
                checked={!!timePref.Midday}
              />
              <CheckLabel
                label="Evening"
                onChange={handleTimeChange("Evening")}
                checked={!!timePref.Evening}
              />
              <CheckLabel
                label="Night"
                onChange={handleTimeChange("Night")}
                checked={!!timePref.Night}
              />
            </Box>
          </Box>
          <Box marginTop="5px">
            <InputLabel>How would you like to take your class?</InputLabel>
            <Box display="flex" alignItems="center">
              <CheckLabel
                label="Online"
                onChange={handleModalityChange("Online")}
                checked={!!modalityPref.Online}
              />
              <CheckLabel
                label="In Person"
                onChange={handleModalityChange("Inperson")}
                checked={!!modalityPref.Inperson}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfoButton;
