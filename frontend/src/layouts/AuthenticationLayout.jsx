import { Link, Outlet, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import LoginIcon from "@mui/icons-material/Login";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function AuthenticationLayout() {
  const { pathname } = useLocation();

  const nestedPath = pathname?.split("/")?.[2];

  return (
    <Grid
      alignItems={"center"}
      container
      justifyContent={"center"}
      p={1}
      xs={12}
    >
      <Paper>
        <Grid p={1} xs={12}>
          {["login", "registration"].includes(nestedPath) ? (
            <Grid mb={1} xs={12}>
              <Tabs value={nestedPath}>
                <Tab
                  component={Link}
                  icon={<LoginIcon />}
                  label={"Bejelentkezés"}
                  to={"login"}
                  value={"login"}
                />
              </Tabs>
            </Grid>
          ) : null}
          <Outlet />
        </Grid>
      </Paper>
    </Grid>
  );
}
