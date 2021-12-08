import { ROI } from "./models";
import { originalColumnToType } from "./data/types";
import { Authenticator } from "@aws-amplify/ui-react";
import Amplify, { DataStore } from "aws-amplify";
import configFile from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import React, { useMemo } from "react";
import SideList from "./components/sidelist";
import ROIGraph from "./components/roiGraph";
import QueryButton from "./components/queryButton";
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

export const convertData = (d) =>
  Object.fromEntries(
    Object.entries(d).map(([k, v]) => [originalColumnToType[k], v || undefined])
  );
const uniqueId = (v) =>
  `${v.programName}_${v.institutionName}_${v.state}_${v.programCIPCode}`;

const DRAWER_WIDTH = 350;

// export const loadData = async (x) => {
//   for (let i = 0; i < x.length; i++) {
//     await DataStore.save(
//       new ROI(convertData(x[i]))
//     );
//   }
//}
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

const App = ({ signOut }) => {
  const [list, setList] = React.useState([]);
  const [filterString, setFilterString] = React.useState("");
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const delayedFilterString = useDeferred(filterString, 300);

  const fetchData = async (filter) => {
    console.log("fetch", filter);
    const response = await DataStore.query(ROI, c =>
        c
          .or(chainCall("eq", "state", filter.states))
          .or(chainCall("contains", "programName", filter.programs))
          .or(chainCall("contains", "institutionName", filter.institutions))
    );
    console.log(response);
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
          style={{ margin: 5 }}
          onChange={handleSearch}
          placeholder="Search list..."
        />
        <SideList
          items={filteredList}
          onChange={handleSelectedProgramChange}
          selectedPrograms={selectedPrograms}
        />
      </Drawer>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <QueryButton onChange={fetchData} />
          <Button variant="primary" onClick={signOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" height="100vh">
        <Box minWidth={DRAWER_WIDTH} height="100%" />
        <Box maxWidth="1200px" width="100%" margin="auto" padding="20px">
          <Paper>
            <ROIGraph items={selectedPrograms} />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

const AppWrappedAuth = () => {
  Amplify.configure(configFile);

  return (
    <>
      <Authenticator
        signUpAttributes={["email", "birthdate", "name", "gender", "locale"]}
      >
        {App}
      </Authenticator>
    </>
  );
};

export default AppWrappedAuth;
