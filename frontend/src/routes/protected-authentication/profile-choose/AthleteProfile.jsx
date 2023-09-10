import { Form, useNavigation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AthleteProfile() {
  const navigation = useNavigation();

  return (
    <Grid xs={12}>
      <Form method={"post"}>
        <Grid paddingY={1} xs={12}>
          <LoadingButton
            loading={["loading", "submitting"].includes(navigation.state)}
          >
            {"Sportoló profil készítése"}
          </LoadingButton>
        </Grid>
      </Form>
    </Grid>
  );
}
