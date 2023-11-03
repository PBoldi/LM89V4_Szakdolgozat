import { useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function TestFunctions() {
  const submit = useSubmit();

  function handleCreateAthleteProfiles() {
    submit(null, {
      action: "create-athlete-profiles",
      method: "post",
    });
  }

  function handleCreateTrainerProfiles() {
    submit(null, {
      action: "create-trainer-profiles",
      method: "post",
    });
  }

  return (
    <Grid container justifyContent={"center"} spacing={2} xs={12}>
      <Grid paddingY={1} xs={6}>
        <Button onClick={handleCreateAthleteProfiles}>
          {"Teszt sportolók létrehozása"}
        </Button>
      </Grid>
      <Grid paddingY={1} xs={6}>
        <Button onClick={handleCreateTrainerProfiles}>
          {"Teszt edzők létrehozása"}
        </Button>
      </Grid>
    </Grid>
  );
}
