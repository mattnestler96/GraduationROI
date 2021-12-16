import { ROI } from "./models";
import { originalColumnToType } from "./data/types";
import { sampleData } from "./data/sample";
import { DataStore } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import QueryButton from "./components/queryButton";
import UserInfoButton from "./components/userInfoButton";
import { Hidden, AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import { isInSampleUserMode } from "./utils/userInfo";
import { uniqueId } from "./utils/dataHelpers";
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
        <Box
          maxWidth="calc(100vw - 40px)"
          width="100%"
          padding="20px"
        >
          {children}
        </Box>
      </Hidden>
    </>
  );
};

export const convertData = (d) =>
  Object.fromEntries(
    Object.entries(d).map(([k, v]) => [originalColumnToType[k], v || undefined])
  );
const QUERY_FILTER_KEY = "graduationROI.filterQuery";
const defaultQueryFilter = JSON.parse(
  localStorage.getItem(QUERY_FILTER_KEY)
) || {
  states: ["CALIFORNIA"],
  programs: [],
  institutions: [],
};

export const DRAWER_WIDTH = 350;
export const ITEM_LIMIT = 1000;

const chainCall = (test, param, values) => (c) => {
  if (!values || values.length === 0) {
    return;
  }
  const newValues = [...values];
  const currValue = newValues.pop();
  if (values.length > 1) {
    return chainCall(test, param, newValues)(c[param](test, currValue));
  }
  return c[param](test, currValue);
};

const App = (props) => {
  const { signOut, user } = props;
  const [list, setList] = React.useState([]);
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [queryFilter, setQueryFilter] = React.useState(defaultQueryFilter);
  const [tabValue, setTabValue] = React.useState(1);

  const fetchData = async (filter) => {
    setQueryFilter(filter);
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(filter));
    const response = await DataStore.query(
      ROI,
      (c) =>
        c
          .or(chainCall("eq", "state", filter.states))
          .or(chainCall("eq", "programCategory", filter.programCategory))
          .or(chainCall("eq", "programName", filter.programs))
          .or(chainCall("contains", "institutionName", filter.institutions)),
      { limit: ITEM_LIMIT }
    );
    const dedupe = {};
    response.forEach(async (v) => {
      if (dedupe[uniqueId(v)]) {
        console.log(`delete ${uniqueId(v)}`, v.id);
        await DataStore.delete(ROI, v.id);
      }
      dedupe[uniqueId(v)] = v.id;
    });
    setList(response);
  };

  const handleTabChange = (e, v) => {
    setTabValue(v);
  };

  const handleSelectedProgramChange = (changedValues) => {
    setSelectedPrograms(changedValues);
  };

  React.useEffect(() => {
    if (!isInSampleUserMode()) {
      fetchData(queryFilter);
    } else {
      setList(
        sampleData.map(convertData).map((v) => ({ ...v, id: uniqueId(v) }))
      );
    }
  }, []);

  return (
    <>
      <SidelistDrawer
        programs={list}
        selectedPrograms={selectedPrograms}
        onSelectedChange={handleSelectedProgramChange}
      />
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
        >
          <Box>
            <QueryButton onChange={fetchData} defaultFilter={queryFilter} />
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
          {tabValue === 0 ? (
            <SummaryTab
              programs={list}
              selectedPrograms={selectedPrograms}
              onChange={handleSelectedProgramChange}
            />
          ) : null}
          {tabValue === 1 ? (
            <VisualizationTab
              selectedPrograms={selectedPrograms}
              onChange={handleSelectedProgramChange}
            />
          ) : null}
        </MainWrapper>
      </Box>
    </>
  );
};

export default App;
