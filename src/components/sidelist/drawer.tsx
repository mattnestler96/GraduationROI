import {
  Drawer,
  Toolbar,
  TextField,
  Box,
  Button,
  Hidden,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import SideList from ".";
import { DRAWER_WIDTH } from "../../App";
import { ROI } from "../../models";
import { uniqueId } from "../../utils/dataHelpers";
import { useDeferred } from "../../utils/useDeferred";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ResponsiveDrawer = ({ children }: { children: JSX.Element }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - 56px)`,
            overflow: "visible",
          },
        }}
      />
      <Hidden smDown>
        <Drawer
          anchor="left"
          open={true}
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          {children}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          sx={{ height: "50%" }}
          anchor="bottom"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          swipeAreaWidth={56}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF",
              position: "absolute",
              top: -56,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Box height="56px" paddingTop="20px" textAlign="center">
              <Typography variant="caption" color="GrayText">
                Programs
              </Typography>
            </Box>
          </Box>
          {children}
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

interface ISidelistDrawer {
  programs: ROI[];
  selectedPrograms: ROI[];
  onSelectedChange: (v: ROI[]) => void;
}

const SidelistDrawer = (props: ISidelistDrawer) => {
  const [filterString, setFilterString] = React.useState("");
  const [sortType, setSortType] = React.useState("");
  const delayedFilterString = useDeferred(filterString, 300);
  const selectedIds = props.selectedPrograms.map((v) => v.id);
  const filteredList = React.useMemo(
    () =>
      props.programs
        .sort((a) => {
          if (sortType === "selected") {
            return selectedIds.includes(a.id) ? -1 : 1;
          }
          return 0;
        })
        .filter((v) =>
          uniqueId(v).toUpperCase().includes(delayedFilterString.toUpperCase())
        ),
    [delayedFilterString, props.programs, sortType]
  );

  const handleSort = () => {
    setSortType("selected");
  };
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterString(e.target.value);
  };

  return (
    <ResponsiveDrawer>
      <>
        <TextField
          style={{ margin: 10 }}
          onChange={handleSearch}
          label="Search list..."
        />
        <Box>
          <Button onClick={handleSort}>Sort</Button>
          <Button onClick={() => props.onSelectedChange([])}>Clear</Button>
        </Box>
        <SideList
          items={filteredList}
          onChange={props.onSelectedChange}
          selectedPrograms={props.selectedPrograms}
        />
      </>
    </ResponsiveDrawer>
  );
};

export default SidelistDrawer;
