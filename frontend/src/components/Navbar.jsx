import { Fragment, useState } from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SpeedIcon from "@mui/icons-material/Speed";
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
          {!user?.id ? (
            <Fragment>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color={"inherit"}
                onClick={() => navigate("/authentication/login")}
                size={"small"}
                sx={{ mr: 2 }}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Bejelentkezés
              </IconButton>
              <IconButton
                color={"inherit"}
                onClick={() => navigate("/authentication/registration")}
                size={"small"}
                sx={{ mr: 2 }}
              >
                <PersonAddIcon sx={{ mr: 1 }} />
                Regisztráció
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              {!user?.athleteprofile && !user?.trainerprofile ? (
                <Fragment>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/profile-choose/athlete-profile")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <FitnessCenterIcon sx={{ mr: 1 }} />
                    Sportolói profil készítése
                  </IconButton>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/profile-choose/trainer-profile")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <SportsIcon sx={{ mr: 1 }} />
                    Edző profil készítése
                  </IconButton>
                </Fragment>
              ) : user?.athleteprofile ? (
                <Fragment>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/athlete/search-trainer")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <SportsIcon sx={{ mr: 1 }} />
                    Edző keresés
                  </IconButton>

                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/athlete/search-athlete")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <GroupAddIcon sx={{ mr: 1 }} />
                    Edzőtárs keresés
                  </IconButton>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/athlete/athletes-to-be-partner")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <AddReactionIcon sx={{ mr: 1 }} />
                    Edzőtársnak jelentkezők
                  </IconButton>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/athlete/athlete-partners")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <GroupIcon sx={{ mr: 1 }} />
                    Edzőtársak
                  </IconButton>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/athlete/athlete-trainers")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <EmojiEventsIcon sx={{ mr: 1 }} />
                    Edzőim
                  </IconButton>
                </Fragment>
              ) : user?.trainerprofile ? (
                <Fragment>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/trainer/applied-athletes")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <PeopleIcon sx={{ mr: 1 }} />
                    Jelentkezett sportolók
                  </IconButton>
                  <IconButton
                    color={"inherit"}
                    onClick={() => navigate("/trainer/trainer-athletes")}
                    size={"small"}
                    sx={{ mr: 2 }}
                  >
                    <EmojiEventsIcon sx={{ mr: 1 }} />
                    Sportolóim
                  </IconButton>
                </Fragment>
              ) : null}
              <Box sx={{ flexGrow: 1 }} />
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
                {user?.trainerprofile ? (
                  <MenuItem
                    component={Link}
                    to={`/trainer/${user?.trainerprofile?.id}/trainer-profile`}
                  >
                    <ListItemIcon>
                      <SportsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Edző profil"} />
                  </MenuItem>
                ) : null}
                {user?.athleteprofile ? (
                  <MenuItem
                    component={Link}
                    to={`/athlete/${user?.athleteprofile?.id}/athlete-profile`}
                  >
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
                            <SportsSoccerIcon sx={{ mr: 1 }} />
                            {"Sportok"}
                          </ListItemIcon>
                        </ListItemText>
                      </MenuItem>
                      <MenuItem component={Link} to={"/admin/person-questions"}>
                        <ListItemText inset>
                          <ListItemIcon>
                            <QuestionMarkIcon sx={{ mr: 1 }} />
                            {"Kérdések a felhasználókhoz"}
                          </ListItemIcon>
                        </ListItemText>
                      </MenuItem>{" "}
                      <MenuItem component={Link} to={"/admin/test-functions"}>
                        <ListItemText inset>
                          <ListItemIcon>
                            <SpeedIcon sx={{ mr: 1 }} />
                            {"Teszt funkciók"}
                          </ListItemIcon>
                        </ListItemText>
                      </MenuItem>
                    </Collapse>
                  </div>
                ) : null}
                <Divider />
                <MenuItem
                  onClick={() =>
                    submit(null, { action: "/logout", method: "post" })
                  }
                >
                  <ListItemIcon color={"inherit"} size={"small"} sx={{ mr: 2 }}>
                    <LogoutIcon />
                    Kilépés
                  </ListItemIcon>
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
