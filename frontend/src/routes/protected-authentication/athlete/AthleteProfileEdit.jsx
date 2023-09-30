import { useState } from "react";
import { Form, useLoaderData, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function UserProfileEdit() {
  const { pathname } = useLocation();
  const athleteProfile = useLoaderData();

  const [biography, setBiography] = useState(athleteProfile?.biography ?? "");

  return (
    <Grid container>
      <Grid xs={12}>
        <Form action={pathname} encType={"multipart/form-data"} method={"post"}>
          <TextField
            inputProps={{ maxLength: 1000 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  {biography.length}/1000
                </InputAdornment>
              ),
            }}
            label={"Magamról"}
            multiline
            name={"biography"}
            onChange={(event) => setBiography(event.target.value)}
            placeholder={"Magamról"}
            value={biography}
          />
          <Grid paddingY={1} xs={12}>
            <LoadingButton
              loading={["loading", "submitting"].includes(navigation.state)}
            >
              {"Mentés"}
            </LoadingButton>
          </Grid>
        </Form>
      </Grid>
    </Grid>
  );
}
