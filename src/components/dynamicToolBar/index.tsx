import "@aws-amplify/ui-react/styles.css";
import React from "react";
import QueryButton from "../queryButton";
import UserInfoButton from "../userInfoButton";
import {
  Hidden,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  Fab,
} from "@mui/material";
import User from "@mui/icons-material/Person";
import MenuClosed from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import LearnMoreButton from "../learnmore";
import LogoutButton from "../logout";
import SidelistDrawer from "../sidelist/drawer";
import { getUserName } from "../../utils/userInfo";

const UserMenu = ({
  signOut,
  username,
}: {
  signOut: () => void;
  username: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <User />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <UserInfoButton username={username} />
        <LogoutButton signOut={signOut} />
      </Menu>
    </>
  );
};

const HideableQuery = ({ visible }: { visible: boolean }) => (
  <Box visibility={visible ? "visible" : "hidden"}>
    <QueryButton />
  </Box>
);

const App = (props: { tabValue: any; signOut: () => void }) => {
  const { tabValue, signOut } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  return (
    <>
      {tabValue < 2 && (
        <SidelistDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      )}
      <AppBar
        color="transparent"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Hidden smUp>
          <Toolbar
            style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
          >
            <Box display="flex" alignItems="center">
              {tabValue < 2 && (
                <>
                  {drawerOpen ? (
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                      <MenuOpen />
                    </Fab>
                  ) : (
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                      {drawerOpen ? <MenuOpen /> : <MenuClosed />}
                    </IconButton>
                  )}
                </>
              )}
              <HideableQuery visible={!drawerOpen} />
            </Box>
            {!drawerOpen && (
              <Box>
                <LearnMoreButton />
                <UserMenu signOut={signOut} username={getUserName()} />
              </Box>
            )}
          </Toolbar>
        </Hidden>
        <Hidden smDown>
          <Toolbar
            style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
          >
            <Box display="flex" alignItems="center">
              <QueryButton />
            </Box>
            <Box>
              <LearnMoreButton />
              <UserMenu signOut={signOut} username={getUserName()} />
            </Box>
          </Toolbar>
        </Hidden>
      </AppBar>
    </>
  );
};

export default App;
