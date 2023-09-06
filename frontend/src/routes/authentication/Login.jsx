import { Form } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  return (
    <Grid xs={12}>
      <Form method={"post"}>
        <TextField autoFocus label={"E-mail"} name={"email"} type={"email"} />
        <TextField label={"Jelszó"} name={"password"} type={"password"} />
        <Grid paddingY={1} xs={12}>
          <Button type={"submit"}>{"Bejelentkezés"}</Button>
        </Grid>
      </Form>
    </Grid>
  );
}
