import { ROI } from "./models";
import { originalColumnToType } from "./data/types";
import { sampleData } from "./data/sample";
import { DataStore } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import React, { useMemo } from "react";
import SideList from "./components/sidelist";
import ROIOverTimeGraph from "./components/roiOverTimeLine";
import ROILifeTimeBar from "./components/roiLifeTimeBar";
import GraduationRatePie from "./components/graduationRate";
import ROICostSizeBubble from "./components/roiCostSizeBubble";
import QueryButton from "./components/queryButton";
import UserInfoButton from "./components/userInfoButton";
import {
  Button,
  Box,
  TextField,
  AppBar,
  Paper,
  Toolbar,
  Drawer,
} from "@mui/material";
import { useDeferred } from "./utils/useDeferred";
import GoogleAds from "./components/googleAd";
import { isInSampleUserMode, getUserName } from "./utils/userInfo";

export const convertData = (d) =>
  Object.fromEntries(
    Object.entries(d).map(([k, v]) => [originalColumnToType[k], v || undefined])
  );
const uniqueId = (v) =>
  `${v.programName}_${v.institutionName}_${v.state}_${v.programCIPCode}`;
const QUERY_FILTER_KEY = "graduationROI.filterQuery";
const defaultQueryFilter = JSON.parse(
  localStorage.getItem(QUERY_FILTER_KEY)
) || {
  states: ["CALIFORNIA"],
  programs: [],
  institutions: [],
};

const DRAWER_WIDTH = 350;

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
  const [filterString, setFilterString] = React.useState("");
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [queryFilter, setQueryFilter] = React.useState(defaultQueryFilter);
  const delayedFilterString = useDeferred(filterString, 300);

  const fetchData = async (filter) => {
    setQueryFilter(filter);
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(filter));
    const response = await DataStore.query(ROI, (c) =>
      c
        .or(chainCall("eq", "state", filter.states))
        .or(chainCall("contains", "programName", filter.programs))
        .or(chainCall("contains", "institutionName", filter.institutions))
    );
    const dedupe = {};
    response.forEach(async (v) => {
      if (dedupe[uniqueId(v)]) {
        console.log(`delete ${uniqueId(v)}`, v.id);
        await DataStore.delete(ROI, v.id);
      }
      dedupe[uniqueId] = v.id;
    });
    setList(response);
  };

  const handleSearch = (e, v) => {
    setFilterString(e.target.value);
  };

  const filteredList = useMemo(
    () =>
      list.filter((v) =>
        uniqueId(v).toUpperCase().includes(delayedFilterString.toUpperCase())
      ),
    [delayedFilterString, list]
  );

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
        <TextField
          style={{ margin: 10 }}
          onChange={handleSearch}
          label="Search list..."
        />
        <SideList
          items={filteredList}
          onChange={handleSelectedProgramChange}
          selectedPrograms={selectedPrograms}
        />
      </Drawer>
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
            <Button
              style={{ marginRight: 10 }}
              variant="outlined"
              onClick={() =>
                window.open(
                  "https://freopp.org/how-we-calculated-the-return-on-investment-of-a-college-degree-e93bce69f9c7",
                  "_blank"
                )
              }
            >
              Learn More
            </Button>
            <Button variant="outlined" onClick={signOut}>
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box minWidth={DRAWER_WIDTH} height="100%" />
        <Box maxWidth="1200px" width="100%" margin="auto" padding="20px">
          <Toolbar />
          <GoogleAds
            slot="2530321269"
            style={{ display: "inline-block", height: "90px", width: "728px" }}
          />
          <Paper style={{ padding: 15 }}>
            <ROILifeTimeBar items={selectedPrograms} />
            <ROIOverTimeGraph items={selectedPrograms} />
            <Box height={500} marginBottom={"80px"}>
              <GraduationRatePie items={selectedPrograms} />
            </Box>
            {/* <ROICostSizeBubble items={selectedPrograms} /> */}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default App;
