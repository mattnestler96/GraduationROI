import {
  Box,
  Typography,
  TextFieldProps,
  ButtonProps,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import DullTextField from "@mui/material/TextField";
import DullButton from "@mui/material/Button";
import { Auth } from "aws-amplify";
import React, { ChangeEvent } from "react";
import { SAMPLE_USER, setUserName } from "../../utils/userInfo";

const TextField = (props: TextFieldProps) => {
  return <DullTextField style={{ ...props.style, margin: 5 }} {...props} />;
};
const Button = (props: ButtonProps) => {
  return <DullButton style={{ ...props.style, margin: 5 }} {...props} />;
};

interface IAuth {
  updatedAuth: (user: any) => void;
}

const Authenticator = (props: IAuth): JSX.Element => {
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [user, setUser] = React.useState<any>({});
  const [error, setError] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [needConfirmation, setNeedConfirmation] = React.useState(false);
  const isPreviouslyLoggedIn = async () => {
    try {
      const response = await Auth.currentAuthenticatedUser();
      setUser(response);
      props.updatedAuth(response);
      setDialogOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    isPreviouslyLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setLoading(true);
    try {
      const { attributes } = await Auth.signIn(user.username, user.password);
      setUserName(attributes.email);
      props.updatedAuth?.(user);
      setDialogOpen(false);
    } catch (e: any) {
      console.warn(e.message);
      setNeedConfirmation(e.message === "User is not confirmed.");
      setError(e);
    }
    setLoading(false);
  };
  const handleSignUp = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await Auth.signUp(user);
      setNeedConfirmation(response.userConfirmed);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
    setLoading(false);
  };
  const handleConfirm = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await Auth.confirmSignUp(user.username, user.code);
      props.updatedAuth?.(user);
      setDialogOpen(false);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
    setLoading(false);
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
    setDialogOpen(false);
    setUserName(SAMPLE_USER);
    props.updatedAuth?.(user);
  };
  return (
    <Dialog open={dialogOpen} onClose={handleSample}>
      <DialogTitle>
        Login or Sign Up
        {loading && <CircularProgress />}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {needConfirmation ? (
            <>
              <TextField label="code" onChange={handleConfirmChange} />
              {error && <Typography color="error">{error.message}</Typography>}
              <Box display="flex" flexDirection="row">
                <Button color="secondary" onClick={handleResendConfirm}>
                  Resend Code
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleConfirm}
                >
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </Box>
              <Button color="primary" onClick={handleSample}>
                Continue to Sample
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Authenticator;
