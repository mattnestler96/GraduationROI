import Amplify, { Auth } from "aws-amplify";
import configFile from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
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

  return (
    <ProgramProvider>
      <App signOut={handleSignOut} />
      {!loggedIn && <CustomAuth updatedAuth={() => setLoggedIn(true)} />}
    </ProgramProvider>
  );
};

export default AppWrappedAuth;
