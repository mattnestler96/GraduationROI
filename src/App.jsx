import "@aws-amplify/ui-react/styles.css";
import React from "react";
import QueryButton from "./components/queryButton";
import UserInfoButton from "./components/userInfoButton";
import { Hidden, AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import VisualizationTab from "./components/tabs/visualizations";
import SummaryTab from "./components/tabs/summary";
import UserAnalysisTab from "./components/tabs/useranalysis";
import LearnMoreButton from "./components/learnmore";
import LogoutButton from "./components/logout";
import SidelistDrawer from "./components/sidelist/drawer";
import Uploader from "./components/uploader";

const MainWrapper = ({ children, showSidebar }) => {
  return (
    <>
      <Hidden smDown>
        {showSidebar && <Box minWidth={DRAWER_WIDTH} height="100%" />}
        <Box
          maxWidth={`calc(100vw - ${showSidebar ? DRAWER_WIDTH : 0}px - 40px)`}
          width="100%"
          padding="20px"
        >
          {children}
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box maxWidth="calc(100vw - 40px)" width="100%" padding="20px">
          {children}
        </Box>
      </Hidden>
    </>
  );
};

export const DRAWER_WIDTH = 350;

const App = (props) => {
  const { signOut, user } = props;
  const groups =
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"] || [];
  const isAdmin = groups.includes("Admins");
  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

  return (
    <>
      {tabValue < 2 && <SidelistDrawer />}
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
        >
          <Box>
            <QueryButton />
            <UserInfoButton username={user.attributes.email} />
          </Box>
          <Box>
            <LearnMoreButton />
            <LogoutButton signOut={signOut} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" width="100vw">
        <MainWrapper showSidebar={tabValue < 2}>
          <Toolbar />
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Summary" />
            <Tab label="Analysis" />
            {isAdmin ? <Tab label="User Analysis" /> : null}
            {isAdmin ? <Tab label="Uploader" /> : null}
          </Tabs>
          {tabValue === 0 ? <SummaryTab /> : null}
          {tabValue === 1 ? <VisualizationTab /> : null}
          {isAdmin && tabValue === 2 ? <UserAnalysisTab /> : null}
          {isAdmin && tabValue === 3 ? <Uploader /> : null}
        </MainWrapper>
      </Box>
    </>
  );
};

export default App;
