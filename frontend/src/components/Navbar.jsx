import { Fragment, useState } from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Toolbar from "@mui/material/Toolbar";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openAdmin, setOpenAdmin] = useState(false);

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
                  PaperProps={{ style: { width: 300 } }}
                  sx={{ mt: "45px" }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                >
                  <MenuItem component={Link} to={"/user-profile"}>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Profil"} />
                  </MenuItem>
                  {user?.trainer_profile ? (
                    <MenuItem component={Link} to={"/trainer-profile"}>
                      <ListItemIcon>
                        <SportsIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Edző profil"} />
                    </MenuItem>
                  ) : null}
                  {user?.athlete_profile ? (
                    <MenuItem component={Link} to={"/athlete-profile"}>
                      <ListItemIcon>
                        <FitnessCenterIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Sportolói profil"} />
                    </MenuItem>
                  ) : null}
                  {user?.is_admin ? (
                    <div>
                      <MenuItem
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenAdmin(!openAdmin);
                        }}
                      >
                        <ListItemIcon>
                          <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Admin"} />
                        {openAdmin ? <ExpandLess /> : <ExpandMore />}
                      </MenuItem>
                      <Collapse in={openAdmin} timeout={"auto"} unmountOnExit>
                        <MenuItem component={Link} to={"/admin/sports"}>
                          <ListItemText inset>
                            <ListItemIcon>
                              <SportsSoccerIcon />
                              {"Sportok"}
                            </ListItemIcon>
                          </ListItemText>
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to={"/admin/person-questions"}
                        >
                          <ListItemText inset>
                            <ListItemIcon>
                              <QuestionMarkIcon />
                              {"Kérdések a felhasználókhoz"}
                            </ListItemIcon>
                          </ListItemText>
                        </MenuItem>
                      </Collapse>
                    </div>
                  ) : null}
                  <MenuItem
                    onClick={() =>
                      submit(null, { action: "/logout", method: "post" })
                    }
                  >
                    <IconButton color={"inherit"} size={"small"} sx={{ mr: 2 }}>
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
