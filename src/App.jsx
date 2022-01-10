import React from "react";
import {
  Hidden,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import VisualizationTab from "./components/tabs/visualizations";
import SummaryTab from "./components/tabs/summary";
import Uploader from "./components/uploader";
import DynamicToolBar from './components/dynamicToolBar';
import { setUpAnalytics } from "./utils/userSearchTracking";
import { getUserName, isAdminMode } from "./utils/userInfo";

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

export const DRAWER_WIDTH = 350;

const App = (props) => {
  const { signOut, user } = props;
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

  const userName = getUserName();
  React.useEffect(() => {
    setUpAnalytics();
  }, [userName, user]);

  return (
    <>
      <DynamicToolBar signOut={signOut} tabValue={tabValue} />
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
            {isAdminMode() ? (
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
          {isAdminMode() && tabValue === 2 ? <Uploader /> : null}
        </MainWrapper>
      </Box>
    </>
  );
};

export default App;
