import {
  Drawer,
  Toolbar,
  TextField,
  Box,
  Button,
  Hidden,
  Typography,
  SwipeableDrawer,
  Menu,
  MenuItem,
} from "@mui/material";
import UpArrow from "@mui/icons-material/KeyboardArrowUpRounded";
import React, { ChangeEvent, useContext } from "react";
import SideList from ".";
import { DRAWER_WIDTH } from "../../App";
import { uniqueId } from "../../utils/dataHelpers";
import { useDeferred } from "../../utils/useDeferred";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";
import { Programs } from "../../contexts/programs";
import { ROI } from "../../models";

const PullerBox = styled(Box)(() => ({
  width: 30,
  color: grey[900],
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));
const Puller = () => (
  <PullerBox>
    <UpArrow color="inherit" />
  </PullerBox>
);

const ResponsiveDrawer = ({ children }: { children: JSX.Element }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
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
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(70% - 56px)`,
              overflow: "visible",
            },
          }}
        />
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
                Select Programs
              </Typography>
            </Box>
          </Box>
          <Box width="100%" overflow="scroll">
            {children}
          </Box>
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

const SidelistDrawer = () => {
  const { programs, handleSelectedProgramChange, selectedColorMap } =
    useContext(Programs);
  const [filterString, setFilterString] = React.useState("");
  const [sortType, setSortType] = React.useState<
    "selected" | keyof ROI | undefined
  >();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const sortOpen = !!anchorEl;
  const delayedFilterString = useDeferred(filterString, 300);
  const filteredList = React.useMemo(
    () =>
      programs
        .filter((v) =>
          uniqueId(v).toUpperCase().includes(delayedFilterString.toUpperCase())
        )
        .sort((a, b) => {
          if (sortType === "selected") {
            return !!selectedColorMap[a.id] ? -1 : 1;
          }
          if (sortType) {
            const vA = a[sortType];
            const vB = b[sortType];
            if (typeof vA === "number" && typeof vB === "number") {
              return vB - vA;
            }
            if (!!vA && !!vB) {
              return vA < vB ? -1 : 1;
            }
          }
          return 0;
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delayedFilterString, programs, sortType]
  );

  const handleSortClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const handleSortPick = (type: "selected" | keyof ROI) => () => {
    setSortType(type);
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
          style={{ margin: "10px", width: "calc(100% - 20px)" }}
          onChange={handleSearch}
          label="Enter a program or institution..."
        />
        <Box>
          <Button
            data-amplify-analytics-on="click"
            data-amplify-analytics-name="sort_programs_click"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={sortOpen ? "true" : undefined}
            onClick={handleSortClick}
          >
            Sort
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={sortOpen}
            onClose={handleSortClick}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleSortPick("selected")}>Selected</MenuItem>
            <MenuItem onClick={handleSortPick("programName")}>Program</MenuItem>
            <MenuItem onClick={handleSortPick("institutionName")}>
              Institution
            </MenuItem>
            <MenuItem onClick={handleSortPick("lifetimeReturnOnInvestmentROI")}>
              ROI
            </MenuItem>
            <MenuItem onClick={handleSortPick("collegeScorecardCohortCount")}>
              Population
            </MenuItem>
            <MenuItem
              onClick={handleSortPick("shareOfStudentWhoGraduateIn4Years")}
            >
              Graduation Rate
            </MenuItem>
          </Menu>
          <Button
            data-amplify-analytics-on="click"
            data-amplify-analytics-name="clear_programs_click"
            onClick={() => handleSelectedProgramChange([])}
          >
            Clear
          </Button>
        </Box>
        <SideList filteredPrograms={filteredList} />
      </>
    </ResponsiveDrawer>
  );
};

export default SidelistDrawer;
