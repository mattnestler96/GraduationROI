import "@aws-amplify/ui-react/styles.css";
import React from "react";
import QueryButton from "./components/queryButton";
import UserInfoButton from "./components/userInfoButton";
import { Hidden, AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import VisualizationTab from "./components/tabs/visualizations";
import SummaryTab from "./components/tabs/summary";
import LearnMoreButton from "./components/learnmore";
import LogoutButton from "./components/logout";
import SidelistDrawer from "./components/sidelist/drawer";

const MainWrapper = ({ children }) => {
  return (
    <>
      <Hidden smDown>
        <Box minWidth={DRAWER_WIDTH} height="100%" />
        <Box
          maxWidth={`calc(100vw - ${DRAWER_WIDTH}px - 40px)`}
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
  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

  return (
    <>
      <SidelistDrawer />
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
        <MainWrapper>
          <Toolbar />
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Summary" />
            <Tab label="Analysis" />
          </Tabs>
          {tabValue === 0 ? <SummaryTab /> : null}
          {tabValue === 1 ? <VisualizationTab /> : null}
        </MainWrapper>
      </Box>
    </>
  );
};

export default App;
