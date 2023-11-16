import { useState } from "react";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function AthleteProfile() {
  const navigation = useNavigation();
  const { user } = useOutletContext();

  const [biography, setBiography] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  return (
    <Grid xs={12}>
      <Form method={"post"}>
        <input hidden name={"user"} value={user?.id} />
        <Grid xs={12}>
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
          <TextField
            inputProps={{ min: 0 }}
            label={"Magasság"}
            name={"height"}
            onChange={(event) => setHeight(event.target.value)}
            placeholder={"Magasság"}
            type={"number"}
            value={height}
          />
          <TextField
            inputProps={{ min: 0 }}
            label={"Testsúly"}
            name={"weight"}
            onChange={(event) => setWeight(event.target.value)}
            placeholder={"Testsúly"}
            type={"number"}
            value={weight}
          />
        </Grid>
        <Grid paddingY={1} xs={12}>
          <LoadingButton
            loading={["loading", "submitting"].includes(navigation.state)}
          >
            {"Sportolói profil készítése"}
          </LoadingButton>
        </Grid>
      </Form>
    </Grid>
  );
}
