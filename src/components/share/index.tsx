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
  var emailBody = `Hi, I think you might find this information interesting. %0d%0a %0d%0a ${link}`;
  document.location =
    `mailto:${email}?subject=${subject}&body=${emailBody}` as unknown as Location;
};

const QueryButton = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [valid, setValid] = React.useState(false);
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
  const handleEmailChange = (v: string): void => {
    setValid(
      !!v
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
    setEmail(v);
  };

  const getLink = (email?: boolean) => {
    const and = email ? '%26' : '&';
    console.log(new URLSearchParams(queryFilter))
    return `https://www.graduationROI.com?states=${
      statesQueryParam ?? ""
    }${and}programs=${programsQueryParam ?? ""}${and}programCategory=${
      programCategoryQueryParam ?? ""
    }${and}selected=${selectedProgQueryParam ?? ""}`;
  };

  const handleSubmit = () => {
    handleCloseDialog();
    openEmail(getLink(true), email);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getLink());
  };

  return (
    <>
      <Hidden smDown>
        <Button
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="share_click"
          onClick={handleOpenDialog}
          style={{ margin: "0px 5px" }}
          color="primary"
          startIcon={<Send />}
        >
          Share
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="share_click"
          onClick={handleOpenDialog}
        >
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
            onChange={(e) => handleEmailChange(e.target.value)}
            style={{ marginTop: 5 }}
          />
          <Button
            onClick={handleCopyLink}
            data-amplify-analytics-on="click"
            data-amplify-analytics-name="share_copy"
          >
            Copy Link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button
            data-amplify-analytics-on="click"
            data-amplify-analytics-name="share_submit"
            disabled={!valid}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QueryButton;
