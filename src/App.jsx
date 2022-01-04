import "@aws-amplify/ui-react/styles.css";
import React from "react";
import QueryButton from "./components/queryButton";
import UserInfoButton from "./components/userInfoButton";
import {
  Hidden,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import User from "@mui/icons-material/Person";
import MenuClosed from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import VisualizationTab from "./components/tabs/visualizations";
import SummaryTab from "./components/tabs/summary";
import LearnMoreButton from "./components/learnmore";
import LogoutButton from "./components/logout";
import SidelistDrawer from "./components/sidelist/drawer";
import Uploader from "./components/uploader";
import { setUpAnalytics } from "./utils/userSearchTracking";
import { getUserName } from "./utils/userInfo";

const MainWrapper = ({ children, showSidebar }) => {
  return (
    <>
      <Hidden smDown>
        {showSidebar && <Box minWidth={DRAWER_WIDTH} height="100%" />}
        <Box
          maxWidth={`calc(100vw - ${showSidebar ? DRAWER_WIDTH : 0}px - 40px)`}
          width="100%"
          padding="20px"
          paddingTop="0px"
        >
          {children}
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box
          maxWidth="calc(100vw - 40px)"
          width="100%"
          padding="20px"
          paddingTop="0px"
        >
          {children}
        </Box>
      </Hidden>
    </>
  );
};

const UserMenu = ({ signOut, username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <User />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <UserInfoButton username={username} />
        <LogoutButton signOut={signOut} />
      </Menu>
    </>
  );
};

export const DRAWER_WIDTH = 350;

const App = (props) => {
  const { signOut, user } = props;
  const groups =
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"] || [];
  const isAdmin = groups.includes("Admins");
  const [tabValue, setTabValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

  const userName = getUserName();
  React.useEffect(() => {
    setUpAnalytics(isAdmin);
  }, [userName, isAdmin]);

  return (
    <>
      {tabValue < 2 && <SidelistDrawer open={drawerOpen} setOpen={setDrawerOpen} />}
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
        >
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              {tabValue < 2 && (
                <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                  {drawerOpen ? <MenuOpen /> : <MenuClosed />}
                </IconButton>
              )}
            </Hidden>
            <QueryButton />
          </Box>
          <Box>
            <LearnMoreButton />
            <UserMenu signOut={signOut} username={getUserName()} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" width="100vw">
        <MainWrapper showSidebar={tabValue < 2}>
          <Toolbar />
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab
              label={
                <Typography
                  fontSize="small"
                  color={"inherit"}
                >
                  {"Analysis"}
                </Typography>
              }
            />
            <Tab
              label={
                <Typography fontSize="small" color="inherit">
                  {"Break Out"}
                </Typography>
              }
            />
            {isAdmin ? (
              <Tab
                label={
                  <Typography fontSize="small" color="inherit">
                    {"Uploader"}
                  </Typography>
                }
              />
            ) : null}
          </Tabs>
          {tabValue === 0 ? <VisualizationTab /> : null}
          {tabValue === 1 ? <SummaryTab /> : null}
          {isAdmin && tabValue === 2 ? <Uploader /> : null}
        </MainWrapper>
      </Box>
    </>
  );
};

export default App;
