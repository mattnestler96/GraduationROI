import { Box, Typography, TextFieldProps, ButtonProps } from "@mui/material";
import DullTextField from '@mui/material/TextField';
import DullButton from '@mui/material/Button';
import { Auth } from "aws-amplify";
import React, { ChangeEvent } from "react";
import { SAMPLE_USER, setUserName } from "../../utils/userInfo";

const TextField = (props: TextFieldProps) => {
    return <DullTextField style={{ ...props.style, margin: 5}} {...props} />
}
const Button = (props: ButtonProps) => {
    return <DullButton style={{ ...props.style, margin: 5}} {...props} />
}

interface IAuth {
  updatedAuth: (user: any) => void;
}

const Authenticator = (props: IAuth): JSX.Element => {
  const [user, setUser] = React.useState<any>({});
  const [error, setError] = React.useState<any>();
  const [needConfirmation, setNeedConfirmation] = React.useState(false);
  const isPreviouslyLoggedIn = async () => {
    try {
      const response = await Auth.currentAuthenticatedUser();
      setUser(response);
      props.updatedAuth(response);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    isPreviouslyLoggedIn();
  }, []);
  const handleUserNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, username: e.target.value });
  };
  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, password: e.target.value });
  };
  const handleConfirmChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, code: e.target.value });
  };
  const handleSignIn = async () => {
    setError(undefined);
    try {
      const { attributes } = await Auth.signIn(user.username, user.password);
      setUserName(attributes.email);
      props.updatedAuth?.(user);
    } catch (e: any) {
      console.warn(e.message);
      setNeedConfirmation(e.message === "User is not confirmed.");
      setError(e);
    }
  };
  const handleSignUp = async () => {
    setError(undefined);
    try {
      const response = await Auth.signUp(user);
      setNeedConfirmation(response.userConfirmed);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
  };
  const handleConfirm = async () => {
    setError(undefined);
    try {
      await Auth.confirmSignUp(user.username, user.code);
      props.updatedAuth?.(user);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
  };
  const handleResendConfirm = async () => {
    setError(undefined);
    try {
      await Auth.resendSignUp(user.username);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
  };
  const handleSample = () => {
      setError(undefined);
      setUserName(SAMPLE_USER);
      props.updatedAuth?.(user);
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {needConfirmation ? (
        <>
          <TextField label="code" onChange={handleConfirmChange} />
          {error && <Typography color="error">{error.message}</Typography>}
          <Box display="flex" flexDirection="row">
            <Button color="secondary" onClick={handleResendConfirm}>
              Resend Code
            </Button>
            <Button color="primary" variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </>
      ) : (
        <>
          <TextField
            label="Email"
            type="email"
            onChange={handleUserNameChange}
          />
          <TextField
            label="Password"
            type="password"
            onChange={handlePasswordChange}
          />
          {error && <Typography color="error">{error.message}</Typography>}
          <Box display="flex" flexDirection="row">
            <Button color="secondary" onClick={handleSignUp}>
              Sign Up
            </Button>
            <Button variant="contained" color="primary" onClick={handleSignIn}>
              Sign In
            </Button>
          </Box>
            <Button color="primary" onClick={handleSample}>
              Continue to Sample
            </Button>
        </>
      )}
    </Box>
  );
};

export default Authenticator;
