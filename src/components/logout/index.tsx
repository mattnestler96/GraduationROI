import { Hidden, Button, IconButton } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

const LogoutButton = ({ signOut }: { signOut: () => void }) => {
  return (
    <>
      <Hidden smDown>
        <Button variant="outlined" onClick={signOut}>
          Sign out
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton onClick={signOut}>
          <Logout />
        </IconButton>
      </Hidden>
    </>
  );
};

export default LogoutButton;
