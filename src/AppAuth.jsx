import { Authenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import configFile from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { setUserName, SAMPLE_USER, isInSampleUserMode } from "./utils/userInfo";
import App from "./App";

const AuthenticatorWithGuestMode = (props) => {
  const [useGuest, setUseGuest] = React.useState(isInSampleUserMode());

  if (useGuest) {
    return (
      <>
        {props.children({
          user: { attributes: { email: SAMPLE_USER } },
          signOut: () => setUseGuest(false),
        })}
      </>
    );
  } else {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Authenticator {...props} />
        {!props.loggedIn && <Button onClick={() => setUseGuest(true)}>Continue with Sample</Button>}
      </Box>
    );
  }
};

const AppWrappedAuth = () => {
  Amplify.configure(configFile);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const innerWrap = (props) => {
    setLoggedIn(!!props.user);
    setUserName(props.user.attributes.email);
    return <App {...props} />;
  };

  const DynamicWrapper = (props) =>
    !loggedIn ? (
      <Box {...props} />
    ) : (
      <React.Fragment children={props.children} />
    );

  return (
    <DynamicWrapper
      style={{
        display: "flex",
        marginTop: 30,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {loggedIn ? null : (
        <Box>
          <Typography variant="h1" color="primary">
            GraduationROI
          </Typography>
          <Typography color="primary" variant="h4">
            Be well informed of your future
          </Typography>
        </Box>
      )}

      <AuthenticatorWithGuestMode signUpAttributes={["email"]} loggedIn={loggedIn}>
        {innerWrap}
      </AuthenticatorWithGuestMode>
    </DynamicWrapper>
  );
};

export default AppWrappedAuth;
