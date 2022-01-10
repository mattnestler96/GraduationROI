import Amplify, { Auth } from "aws-amplify";
import configFile from "./aws-exports";
import React from "react";
import { getUserName, setUserName } from "./utils/userInfo";
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

  const updatedAuth = () => {
    setLoggedIn(true);
  };

  return (
    <ProgramProvider>
      <App signOut={handleSignOut} user={getUserName()}  />
      {!loggedIn && <CustomAuth updatedAuth={updatedAuth} />}
    </ProgramProvider>
  );
};

export default AppWrappedAuth;
