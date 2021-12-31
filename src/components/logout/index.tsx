import { MenuItem } from "@mui/material";

const LogoutButton = ({ signOut }: { signOut: () => void }) => {
  return (
    <>
      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </>
  );
};

export default LogoutButton;
