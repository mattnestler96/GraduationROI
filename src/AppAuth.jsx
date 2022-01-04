import Amplify, { Auth } from "aws-amplify";
import configFile from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import { Box, Typography } from "@mui/material";
import { setUserName } from "./utils/userInfo";
import App from "./App";
import { ProgramProvider } from "./contexts/programs";
import CustomAuth from "./components/auth";

const AppWrappedAuth = () => {
  Amplify.configure(configFile);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleSignOut = async () => {
    await Auth.signOut();
    setUserName(undefined);
    setLoggedIn(false);
  };

  const DynamicWrapper = (props) =>
    !loggedIn ? (
      <Box {...props} />
    ) : (
      <React.Fragment children={props.children} />
    );

  return (
    <ProgramProvider>
      <DynamicWrapper
        style={{
          display: "flex",
          marginTop: 30,
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {loggedIn ? (
          <App signOut={handleSignOut} />
        ) : (
          <>
            <Box marginBottom="50px">
              <Typography variant="h3" color="primary">
                GraduationROI
              </Typography>
              <Typography color="primary" variant="h6">
                Be well informed of your future
              </Typography>
            </Box>
            <CustomAuth updatedAuth={() => setLoggedIn(true)} />
          </>
        )}
      </DynamicWrapper>
    </ProgramProvider>
  );
};

export default AppWrappedAuth;
