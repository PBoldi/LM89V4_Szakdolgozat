import { useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

export default function SearchTrainer() {
  const athletesLoader = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  const [athletes, setAthlets] = useState(athletesLoader);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  function handleConnection(athleteProfileId, connect) {
    setAthlets(athletes.filter((athlete) => athlete.id !== athleteProfileId));
    submit(
      { athlete_profile: athleteProfileId, connect: connect, user: user?.id },
      { method: "post" }
    );
  }

  return (
    <Grid container justifyContent={"center"} xs={12}>
      <Grid xs={12}>
        <Grid
          alignItems={"center"}
          container
          justifyContent={"center"}
          spacing={2}
          xs={12}
        >
          {athletes
            ?.slice(indexOfFirstCard, indexOfLastCard)
            ?.map((athlete) => (
              <Grid key={athlete?.id} paddingY={1} xs={4}>
                <Card
                  sx={{
                    minHeight: 350,
                    width: 350,
                    m: 1,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
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
                    <Grid paddingY={1} xs={12}>
                      <Typography>
                        {athlete?.user_set[0]?.sex ? "Férfi" : "Nő"}
                      </Typography>
                    </Grid>
                    <Typography>{athlete?.biography}</Typography>
                    <Grid
                      alignItems={"center"}
                      container
                      paddingY={1}
                      spacing={1}
                      xs={12}
                    >
                      {athlete?.user_set?.[0]?.usersport_set.map(
                        (userSport) => (
                          <Grid key={userSport?.sport?.id} xs={"auto"}>
                            <Chip
                              label={userSport?.sport?.name}
                              color={"primary"}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label={"Connect"}
                      color={"success"}
                      onClick={() => handleConnection(athlete?.id, true)}
                    >
                      <DoneOutlineIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      aria-label={"Don't connect"}
                      color={"error"}
                      onClick={() => handleConnection(athlete?.id, false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid paddingY={2}>
        <Pagination
          count={Math.ceil(athletes.length / 3)}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </Grid>
    </Grid>
  );
}
