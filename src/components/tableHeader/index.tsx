import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import Info from "@mui/icons-material/Info";
import React from "react";

interface ITitle {
  info?: string;
  title: string;
  subtitle?: string;
}

const Title = (props: ITitle) => {
  const [infoDialog, setInfoDialog] = React.useState(false);
  const handleOpenInfoDialog = () => {
    setInfoDialog(true);
  };
  const handleCloseInfoDialog = () => {
    setInfoDialog(false);
  };

  return (
    <>
      <Box
        width="100%"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="10px"
      >
        <Box>
          <Typography>{props.title}</Typography>
          <Typography variant="caption" color="textSecondary">
            {props.subtitle}
          </Typography>
        </Box>
        {props.info && (
          <IconButton onClick={handleOpenInfoDialog}>
            <Info />
          </IconButton>
        )}
      </Box>
      <Dialog open={infoDialog} onClose={handleCloseInfoDialog}>
        <DialogContent>
          <Typography>{props.info}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfoDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Title;
