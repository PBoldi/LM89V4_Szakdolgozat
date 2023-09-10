import {
  Link,
  Navigate,
  Outlet,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import SportsIcon from "@mui/icons-material/Sports";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
export default function ProfileChoose() {
  const { pathname } = useLocation();
  const { user } = useOutletContext();

  const nestedPath = pathname?.split("/")?.[2];

  return Boolean(user?.athlete_profile || user?.trainer_profile) ? (
    <Navigate replace to={"/"} />
  ) : (
    <Grid
      alignItems={"center"}
      container
      justifyContent={"center"}
      p={1}
      xs={12}
    >
      <Paper>
        <Grid p={1} xs={12}>
          {["athlete-profile", "trainer-profile"].includes(nestedPath) ? (
            <Grid mb={1} xs={12}>
              <Tabs value={nestedPath}>
                <Tab
                  component={Link}
                  icon={<FitnessCenterIcon />}
                  label={"Edzőt vagy edzőtársat keresek"}
                  to={"athlete-profile"}
                  value={"athlete-profile"}
                />
                <Tab
                  component={Link}
                  icon={<SportsIcon />}
                  label={"Edző vagyok"}
                  to={"trainer-profile"}
                  value={"trainer-profile"}
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
