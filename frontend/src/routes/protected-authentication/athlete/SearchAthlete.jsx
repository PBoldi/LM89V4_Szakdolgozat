import { Fragment, useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

export default function SearchTrainer() {
  const athletesLoader = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  const [athletes, setAthletes] = useState(athletesLoader);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  function handleConnection(athleteProfileId, connect) {
    setAthletes(athletes.filter((athlete) => athlete.id !== athleteProfileId));
    submit(
      {
        athlete_profile: user?.athleteprofile?.id,
        connect: connect,
        athlete_profile_liked: athleteProfileId,
      },
      { method: "post" }
    );
  }

  function handleOpenCollapse(athleteProfileId) {
    const tempAthletes = athletes?.map((athlete) =>
      athlete?.id === athleteProfileId
        ? {
            ...athlete,
            openCollapse: !athletes.find(
              (athlete) => athlete?.id === athleteProfileId
            ).openCollapse,
          }
        : { ...athlete }
    );
    setAthletes(tempAthletes);
  }

  return (
    <Grid container justifyContent={"center"} xs={12}>
      {athletes?.length ? (
        <Fragment>
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
                          athlete?.user?.first_name && athlete?.user?.last_name
                            ? athlete?.user?.first_name +
                              " " +
                              athlete?.user?.last_name
                            : athlete?.user?.email
                        }
                        subheader={
                          athlete?.user?.birth_date
                            ? athlete?.user?.birth_date
                            : "Nincs megadva születési idő"
                        }
                      />
                      <CardMedia
                        alt={"profile_picture"}
                        component={"img"}
                        height={"150"}
                        src={athlete?.user?.profile_picture}
                      />
                      <CardContent>
                        {athlete?.user?.usersport_set.map((userSport) => (
                          <Grid
                            alignItems={"center"}
                            container
                            paddingY={1}
                            spacing={1}
                            xs={12}
                          >
                            <Grid key={userSport?.sport?.id} xs={"auto"}>
                              <Chip
                                label={userSport?.sport?.name}
                                color={"primary"}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </CardContent>
                      <Collapse
                        in={athlete?.openCollapse}
                        timeout={"auto"}
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography>{athlete?.biography}</Typography>
                        </CardContent>
                      </Collapse>
                      <CardActions disableSpacing>
                        <Grid container justifyContent={"center"} xs={12}>
                          <Grid container justifyContent={"center"} xs={12}>
                            <Typography>
                              {athlete?.user?.sex ? "Férfi" : "Nő"}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                              aria-label={"Show more"}
                              color={"primary"}
                              onClick={() => handleOpenCollapse(athlete?.id)}
                            >
                              {athlete?.openCollapse ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          </Grid>
                          <Grid container xs={12}>
                            <Grid>
                              <IconButton
                                aria-label={"Connect"}
                                color={"success"}
                                onClick={() =>
                                  handleConnection(true, athlete?.id)
                                }
                              >
                                <DoneOutlineIcon />
                              </IconButton>
                            </Grid>
                            <Box sx={{ flexGrow: 1 }} />
                            <Grid>
                              <IconButton
                                aria-label={"Don't connect"}
                                color={"error"}
                                onClick={() =>
                                  handleConnection(false, athlete?.id)
                                }
                              >
                                <CloseIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid paddingY={2}>
            <Pagination
              count={Math.ceil(athletes?.length / 3)}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
            />
          </Grid>
        </Fragment>
      ) : (
        <Typography>Nincsenek megjeleníthető sportolók</Typography>
      )}
    </Grid>
  );
}
