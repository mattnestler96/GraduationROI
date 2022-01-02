import {
  Drawer,
  Toolbar,
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useContext } from "react";
import SideList from ".";
import { DRAWER_WIDTH } from "../../App";
import { uniqueId } from "../../utils/dataHelpers";
import { useDeferred } from "../../utils/useDeferred";
import { Programs } from "../../contexts/programs";
import { ROI } from "../../models";

const ResponsiveDrawer = ({ children, open }: { children: JSX.Element, open: boolean }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Drawer
        anchor="left"
        open={matches ? open : true}
        variant="persistent"
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
    </>
  );
};

const SidelistDrawer = ({ open }: {open: boolean}) => {
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
    <ResponsiveDrawer open={open}>
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
