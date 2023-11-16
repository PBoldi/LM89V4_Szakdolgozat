import { Fragment, useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function SearchTrainer() {
  const trainersLoader = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);
  const [trainers, setTrainers] = useState(trainersLoader);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  function handleConnection(connect, trainerProfileId) {
    setTrainers(trainers.filter((trainer) => trainer.id !== trainerProfileId));
    submit(
      {
        connect: connect,
        trainer_profile: trainerProfileId,
        athlete_profile: user?.athleteprofile?.id,
      },
      { method: "post" }
    );
  }

  function handleOpenCollapse(trainerProfileId) {
    const tempTrainers = trainers?.map((trainer) =>
      trainer?.id === trainerProfileId
        ? {
            ...trainer,
            openCollapse: !trainers.find(
              (trainer) => trainer?.id === trainerProfileId
            ).openCollapse,
          }
        : { ...trainer }
    );
    setTrainers(tempTrainers);
  }

  return (
    <Fragment>
      {trainers?.length ? (
        <Grid container justifyContent={"center"} spacing={2} xs={12}>
          <Grid container justifyContent={"center"} xs={12}>
            {trainers
              ?.slice(indexOfFirstCard, indexOfLastCard)
              ?.map((trainer) => (
                <Grid key={trainer?.id} paddingY={1} xs={4}>
                  <Card
                    sx={{
                      m: 1,
                      minHeight: 350,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      width: 350,
                    }}
                  >
                    <CardHeader
                      title={
                        <Grid
                          alignItems={"center"}
                          container
                          paddingY={1}
                          xs={12}
                        >
                          <Avatar
                            alt={trainer?.user?.email}
                            src={trainer?.user?.profile_picture}
                            sx={{ mr: 2 }}
                          >
                            {trainer?.user?.email?.[0]}
                          </Avatar>
                          <Typography>
                            {trainer?.user?.first_name &&
                            trainer?.user?.last_name
                              ? trainer?.user?.first_name +
                                " " +
                                trainer?.user?.last_name
                              : trainer?.user?.email}
                          </Typography>
                        </Grid>
                      }
                      subheader={
                        trainer?.user?.birth_date
                          ? trainer?.user?.birth_date
                          : "Nincs megadva születési idő"
                      }
                    />
                    <CardMedia
                      alt={"certificate"}
                      component={"img"}
                      height={"194"}
                      src={trainer?.certificate}
                    />
                    <CardContent>
                      <Grid alignItems={"center"} container spacing={1} xs={12}>
                        {trainer?.user?.usersport_set.map((userSport) => (
                          <Grid key={userSport?.sport?.id} xs={"auto"}>
                            <Chip
                              label={userSport?.sport?.name}
                              color={"primary"}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                    <Collapse
                      in={trainer?.openCollapse}
                      timeout={"auto"}
                      unmountOnExit
                    >
                      <CardContent>
                        <Grid container spacing={1} xs={12}>
                          <Grid xs={12}>
                            <i>Bemutatkozás: </i>
                            <Typography>
                              {trainer?.biography?.length
                                ? trainer?.biography
                                : "Nincs bemutatkozás megadva"}
                            </Typography>
                          </Grid>
                          <Grid xs={12}>
                            <Typography>
                              <i>Lakhely: </i>
                              {trainer?.user?.city?.length
                                ? trainer?.user?.city
                                : "Nincs lakhely megadva"}
                            </Typography>
                          </Grid>
                          <Grid xs={12}>
                            <Typography>
                              <i>Egy óra edzés ára: </i>
                              {trainer?.price_per_hour + " Ft"}
                            </Typography>
                          </Grid>
                          <Grid xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={trainer?.is_available_online}
                                />
                              }
                              disabled
                              label={"Online is elérhető az edzés anyag"}
                              sx={{ pl: 1 }}
                            />
                          </Grid>
                          <Grid xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox checked={trainer?.is_dietician} />
                              }
                              disabled
                              label={"Dietetikus"}
                              sx={{ pl: 1 }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Collapse>
                    <CardActions>
                      <Grid container justifyContent={"center"} xs={12}>
                        <Grid container justifyContent={"center"} xs={12}>
                          <Typography>
                            {trainer?.user?.sex ? "Férfi" : "Nő"}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />
                          <IconButton
                            aria-label={"Show more"}
                            color={"primary"}
                            onClick={() => handleOpenCollapse(trainer?.id)}
                          >
                            {trainer?.openCollapse ? (
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
                                handleConnection(true, trainer?.id)
                              }
                            >
                              <DoneOutlineIcon />
                            </IconButton>
                          </Grid>
                          <Box sx={{ flexGrow: 1 }} />
                          <Rating
                            defaultValue={trainer?.trainer_aggregated_rating}
                            disabled
                            precision={0.1}
                          />
                          <Box sx={{ flexGrow: 1 }} />
                          <Grid>
                            <IconButton
                              aria-label={"Don't connect"}
                              color={"error"}
                              onClick={() =>
                                handleConnection(false, trainer?.id)
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
          <Grid container justifyContent={"center"} paddingY={2} xs={12}>
            <Pagination
              count={Math.ceil(trainers?.length / 3)}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent={"center"} xs={12}>
          <Typography>Nincsenek megjeleníthető edzők</Typography>
        </Grid>
      )}
    </Fragment>
  );
}
