import { Fragment, useMemo } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const submit = useSubmit();

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
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}