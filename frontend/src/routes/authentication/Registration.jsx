import { useMemo, useState } from "react";
import { Form } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const disabled = useMemo(
    () => !password?.length || password !== passwordConfirm || !email,
    [password, passwordConfirm, email]
  );
  return (
    <Grid xs={12}>
      <Form method={"post"}>
        <TextField
          autoFocus
          label={"E-mail"}
          name={"email"}
          onChange={(event) => setEmail(event.target.value)}
          type={"email"}
          value={email}
        />
        <TextField
          label={"Jelszó"}
          name={"password"}
          onChange={(event) => setPassword(event.target.value)}
          type={"password"}
          value={password}
        />
        <TextField
          label={"Jelszó megerősítése"}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          type={"password"}
          value={passwordConfirm}
        />

        <Grid paddingY={1} xs={12}>
          <Button disabled={disabled} type={"submit"}>
            {"Regisztráció"}
          </Button>
        </Grid>
      </Form>
    </Grid>
  );
}
