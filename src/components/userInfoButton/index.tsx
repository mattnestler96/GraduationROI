import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import React, { ChangeEvent } from "react";
import { UserInfo } from "../../models";

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
    () =>
      typeof currentUserInfo?.dayPreferences === "object"
        ? currentUserInfo?.dayPreferences
        : JSON.parse(currentUserInfo?.dayPreferences || "{}"),
    [currentUserInfo?.dayPreferences]
  );
  const timePref = React.useMemo(
    () =>
      typeof currentUserInfo?.timePreferences === "object"
        ? currentUserInfo?.timePreferences
        : JSON.parse(currentUserInfo?.timePreferences || "{}"),
    [currentUserInfo?.timePreferences]
  );
  const handleOpenDialog = () => {
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

  const handleDataEntry =
    (field: keyof WorkingUserInfo) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        })
      );
    }
    handleCloseDialog();
  };

  const fetchUser = async () => {
    const response = await DataStore.query(UserInfo, (c) =>
      c.email("eq" as never, props.username as never)
    );
    console.log(response[0]);
    if (!response[0]) {
      handleOpenDialog();
    }
    setOriginalUserInfo(response[0]);
    setCurrentUserInfo({ email: props.username, ...response[0] });
  };

  React.useEffect(() => {
    fetchUser();
  }, [props.username]);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        style={{ margin: "0px 5px" }}
        color="secondary"
      >
        User Info
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={currentUserInfo?.email || props.username}
            label="Email"
            onChange={handleDataEntry("email")}
          />
          <TextField
            defaultValue={currentUserInfo?.location}
            label="Zipcode"
            onChange={handleDataEntry("location")}
          />
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
