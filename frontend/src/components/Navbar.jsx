import { Fragment, Link, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={"fixed"}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex", xs: "none" } }}>
            {!user?.id ? (
              <Fragment>
                <IconButton
                  color={"inherit"}
                  onClick={() => navigate("/authentication/login")}
                  size={"small"}
                  sx={{ mr: 2 }}
                >
                  <LoginIcon />
                  Bejelentkezés
                </IconButton>
                <IconButton
                  color={"inherit"}
                  onClick={() => navigate("/authentication/registration")}
                  size={"small"}
                  sx={{ mr: 2 }}
                >
                  <PersonAddIcon />
                  Regisztráció
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                {user?.athlete_profile ? (
                  <Fragment>
                    <IconButton
                      color={"inherit"}
                      onClick={() => navigate("/athlete/search-trainer")}
                      size={"small"}
                      sx={{ mr: 2 }}
                    >
                      <SearchIcon />
                      Edző keresés
                    </IconButton>
                    <IconButton
                      color={"inherit"}
                      onClick={() => navigate("/athlete/search-athlete")}
                      size={"small"}
                      sx={{ mr: 2 }}
                    >
                      <SearchIcon />
                      Edzőtárs keresés
                    </IconButton>
                  </Fragment>
                ) : null}
                <IconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar alt={user?.email} src={user?.profile_picture}>
                    {user?.email?.[0]}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  anchorOrigin={{ horizontal: "right", vertical: "top" }}
                  id={"menu-appbar"}
                  keepMounted
                  onClick={handleCloseUserMenu}
                  onClose={handleCloseUserMenu}
                  open={Boolean(anchorElUser)}
                  // PaperProps={{ style: { width: 250 } }}
                  sx={{ mt: "45px" }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                >
                  <MenuItem component={Link} to={"/user-profile"}>
                    <ListItemText primary={"Profil"} />
                  </MenuItem>
                  {user?.trainer_profile ? (
                    <MenuItem component={Link} to={"/trainer-profile"}>
                      <ListItemText primary={"Edző profil"} />
                    </MenuItem>
                  ) : null}
                  {user?.athlete_profile ? (
                    <MenuItem component={Link} to={"/athlete-profile"}>
                      <ListItemText primary={"Sportolói profil"} />
                    </MenuItem>
                  ) : null}
                  {user?.is_admin ? (
                    <MenuItem component={Link} to={"/admin"}>
                      <ListItemText primary={"Admin"} />
                    </MenuItem>
                  ) : null}
                  <MenuItem component={Link} to={"/logout"}>
                    <IconButton
                      color={"inherit"}
                      onClick={() =>
                        submit(null, { action: "/logout", method: "post" })
                      }
                      size={"small"}
                      sx={{ mr: 2 }}
                    >
                      <LogoutIcon />
                      Kilépés
                    </IconButton>
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
