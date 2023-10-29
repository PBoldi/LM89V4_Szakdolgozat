import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import LoginIcon from "@mui/icons-material/Login";
import Paper from "@mui/material/Paper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function AuthenticationLayout() {
  const { user } = useOutletContext();
  const { pathname } = useLocation();

  const nestedPath = pathname?.split("/")?.[2];

  return user?.id ? (
    <Navigate replace to={"/"} />
  ) : (
    <Grid container justifyContent={"center"} p={1} xs={12}>
      <Grid xs={12} md={8}>
        <Paper elevation={10} sx={{ height: 300 }}>
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
                  <Tab
                    component={Link}
                    icon={<PersonAddIcon />}
                    label={"Regisztráció"}
                    to={"registration"}
                    value={"registration"}
                  />
                </Tabs>
              </Grid>
            ) : null}
            <Outlet />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
