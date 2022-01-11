import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Hidden,
  IconButton,
  TextField,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import React from "react";
import { Programs } from "../../contexts/programs";

const openEmail = (link: string, email: string) => {
  var subject = "GraduationROI: Check this out!";
  var emailBody = `Hi, I think you might find this information interesting. %0d%0a %0d%0a https://www.graduationROI.com${link}`;
  document.location =
    `mailto:${email}?subject=${subject}&body=${emailBody}` as unknown as Location;
};

const QueryButton = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { queryFilter, selectedPrograms } = React.useContext(Programs);

  const selectedProgQueryParam = selectedPrograms.map((v) => v.id).join();
  const { states, programs, programCategory } = queryFilter;
  const statesQueryParam = states?.join();
  const programsQueryParam = programs?.join();
  const programCategoryQueryParam = programCategory?.join();

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleCloseDialog();
    openEmail(
      `?states=${statesQueryParam ?? ""}%26programs=${
        programsQueryParam ?? ""
      }%26programCategory=${programCategoryQueryParam ?? ""}%26selected=${
        selectedProgQueryParam ?? ""
      }`,
      email
    );
  };

  return (
    <>
      <Hidden smDown>
        <Button
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="query_click"
          onClick={handleOpenDialog}
          style={{ margin: "0px 5px" }}
          color="primary"
          startIcon={<Send />}
        >
          Share
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton onClick={handleOpenDialog}>
          <Send />
        </IconButton>
      </Hidden>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>Share what you're learning!</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Who would you like to share with?"
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: 5 }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button disabled={!email} onClick={handleSubmit}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
