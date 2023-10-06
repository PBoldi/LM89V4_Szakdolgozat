import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function SearchTrainer() {
  const athletes = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  function handleConnection(athleteProfileId, connect) {
    submit(
      { athlete_profile: athleteProfileId, connect: connect, user: user?.id },
      { method: "post" }
    );
  }

  return (
    <Grid container justifyContent={"center"} xs={12}>
      {athletes?.map((athlete) => (
        <Grid paddingY={1} xs={4}>
          <Card key={athlete?.id} sx={{ minHeight: 350, width: 350, m: 1 }}>
            <CardHeader
              title={
                athlete?.user_set[0]?.first_name &&
                athlete?.user_set[0]?.last_name
                  ? athlete?.user_set[0]?.first_name +
                    " " +
                    athlete?.user_set[0]?.last_name
                  : athlete?.user_set[0]?.email
              }
              subheader={
                athlete?.user_set[0]?.birth_date
                  ? athlete?.user_set[0]?.birth_date
                  : "Nincs megadva születési idő"
              }
            />
            <CardMedia
              alt={"profile_picture"}
              component={"img"}
              height={"150"}
              src={athlete?.user_set[0]?.profile_picture}
            />
            <CardContent>
              <Typography>
                {athlete?.user_set[0]?.sex ? "Férfi" : "Nő"}
              </Typography>
              <Typography>{athlete?.biography}</Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton
                aria-label={"Connect"}
                onClick={() => handleConnection(athlete?.id, true)}
              >
                <DoneOutlineIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                aria-label={"Don't connect"}
                onClick={() => handleConnection(athlete?.id, false)}
              >
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
