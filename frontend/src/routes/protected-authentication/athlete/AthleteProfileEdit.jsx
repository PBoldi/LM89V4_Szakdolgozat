import { Fragment, useState } from "react";
import {
  Form,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import UserSportCreateOrDeleteDialog from "../../../components/UserSportCreateOrDeleteDialog";

export default function AthleteProfileEdit() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { athleteProfile, sports, userSports } = useLoaderData();
  const { user } = useOutletContext();

  const [biography, setBiography] = useState(athleteProfile?.biography ?? "");
  const [height, setHeight] = useState(athleteProfile?.height);
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState(athleteProfile?.weight);

  return (
    <Fragment>
      <UserSportCreateOrDeleteDialog
        open={open}
        setOpen={setOpen}
        sports={sports}
        user={user}
        userSports={userSports}
      />
      <Form action={pathname} encType={"multipart/form-data"} method={"post"}>
        <input defaultValue={user?.id} hidden name={"user"} />
        <Grid container spacing={2} xs={12}>
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
          </Grid>
          <Grid container xs={12}>
            <Grid xs={6}>
              <TextField
                inputProps={{ min: 0 }}
                label={"Magasság"}
                name={"height"}
                onChange={(event) => setHeight(event.target.value)}
                placeholder={"Magasság"}
                type={"number"}
                value={height}
              />
            </Grid>
            <Grid xs={6}>
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
          </Grid>
          <Grid paddingY={1} xs={6}>
            <Button color={"secondary"} onClick={() => setOpen(true)}>
              {"Sport felvétele"}
            </Button>
          </Grid>
          <Grid paddingY={1} xs={6}>
            <Button
              color={"secondary"}
              onClick={() => navigate("person-question-weighings")}
            >
              {"Kérdések kitöltése"}
            </Button>
          </Grid>
          <Grid paddingY={1} xs={12}>
            <LoadingButton
              loading={["loading", "submitting"].includes(navigation.state)}
            >
              {"Mentés"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
      <Outlet context={{ user }} />
    </Fragment>
  );
}
