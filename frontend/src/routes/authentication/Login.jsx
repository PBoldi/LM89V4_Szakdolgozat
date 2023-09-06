import { Form, useNavigation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function Login() {
  const navigation = useNavigation();

  return (
    <Grid xs={12}>
      <Form method={"post"}>
        <TextField autoFocus label={"E-mail"} name={"email"} type={"email"} />
        <TextField label={"Jelszó"} name={"password"} type={"password"} />
        <Grid paddingY={1} xs={12}>
          {/* <LoadingButton
            loading={["loading", "submitting"].includes(navigation.state)}
          >
            {"login"}
          </LoadingButton> */}
          <Button type={"submit"}>{"Bejelentkezés"}</Button>
        </Grid>
      </Form>
    </Grid>
  );
}
