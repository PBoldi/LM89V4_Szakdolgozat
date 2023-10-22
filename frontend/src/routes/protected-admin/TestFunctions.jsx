import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function TestFunctions() {
  return (
    <Grid container justifyContent={"center"} spacing={2} xs={12}>
      <Grid paddingY={1} xs={6}>
        <Button>{"Teszt sportolók létrehozása"}</Button>
      </Grid>
      <Grid paddingY={1} xs={6}>
        <Button>{"Teszt edzők létrehozása"}</Button>
      </Grid>
    </Grid>
  );
}
