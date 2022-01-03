import {
  Drawer,
  Toolbar,
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  Hidden,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CloseDrawer from "@mui/icons-material/KeyboardDoubleArrowLeft";
import React, { ChangeEvent, useContext } from "react";
import SideList from ".";
import { DRAWER_WIDTH } from "../../App";
import { uniqueId } from "../../utils/dataHelpers";
import { useDeferred } from "../../utils/useDeferred";
import { Programs } from "../../contexts/programs";
import { ROI } from "../../models";
import Filter from "@mui/icons-material/FilterList";

const ResponsiveDrawer = ({
  children,
  open,
}: {
  children: JSX.Element;
  open: boolean;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
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

const SidelistDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { programs, handleSelectedProgramChange, selectedColorMap } =
    useContext(Programs);
  const [filterString, setFilterString] = React.useState("");
  const [sortType, setSortType] = React.useState<
    "selected" | keyof ROI | undefined
  >("lifetimeReturnOnInvestmentROI");
  const [sortDirection, setSortDirection] = React.useState<"ASC" | "DESC">(
    "ASC"
  );
  const isSelected = (v: "selected" | keyof ROI) => sortType === v;

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
          const multi = sortDirection === "ASC" ? -1 : 1;
          if (sortType === "selected") {
            return !!selectedColorMap[a.id] ? -1 * multi : 1 * multi;
          }
          if (sortType) {
            const vA = a[sortType];
            const vB = b[sortType];
            if (typeof vA === "number" && typeof vB === "number") {
              return vA < vB ? -1 * multi : 1 * multi;
            }
            if (!!vA && !!vB) {
              return vA > vB ? -1 * multi : 1 * multi;
            }
          }
          return 0;
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delayedFilterString, programs, sortType, sortDirection]
  );

  const handleSortClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const handleSortPick = (type: "selected" | keyof ROI) => () => {
    if (sortType !== type) {
      setSortType(type);
      setSortDirection("ASC");
    } else {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    }
  };
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterString(e.target.value);
  };

  const SortMenuItem = ({
    label,
    sortKey,
  }: {
    label: string;
    sortKey: "selected" | keyof ROI;
  }) => {
    return (
      <MenuItem
        selected={isSelected(sortKey)}
        onClick={handleSortPick(sortKey)}
      >
        <ListItemText>{label}</ListItemText>
        {isSelected(sortKey) && (
          <ListItemIcon>
            <Filter
              style={{
                transform: sortDirection === "DESC" ? "rotate(180deg)" : "none",
              }}
            />
          </ListItemIcon>
        )}
      </MenuItem>
    );
  };

  return (
    <ResponsiveDrawer open={open}>
      <>
        <Box display="flex" alignItems="center">
          <TextField
            style={{ margin: "10px", width: "calc(100% - 20px)" }}
            onChange={handleSearch}
            label="Enter a program or institution..."
          />
          <Hidden smUp>
            <IconButton onClick={() => setOpen(false)}>
              <CloseDrawer />
            </IconButton>
          </Hidden>
        </Box>
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
            <SortMenuItem label="Selected" sortKey="selected" />
            <SortMenuItem label="Program" sortKey="programName" />
            <SortMenuItem label="Institution" sortKey="institutionName" />
            <SortMenuItem label="ROI" sortKey="lifetimeReturnOnInvestmentROI" />
            <SortMenuItem
              label="Population"
              sortKey="collegeScorecardCohortCount"
            />
            <SortMenuItem
              label="Graduation Rate"
              sortKey="shareOfStudentWhoGraduateIn4Years"
            />
            <SortMenuItem
              label="Acceptance Rate"
              sortKey="admissionsRate"
            />
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
