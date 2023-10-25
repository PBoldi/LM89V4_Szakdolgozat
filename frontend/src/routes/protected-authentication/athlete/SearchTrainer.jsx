import { useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

export default function SearchTrainer() {
  const trainers = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  console.log(trainers);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  function handleConnection(connect, trainerProfileId) {
    submit(
      { connect: connect, trainer_profile: trainerProfileId, user: user?.id },
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
          {trainers
            ?.slice(indexOfFirstCard, indexOfLastCard)
            ?.map((trainer) => (
              <Grid key={trainer?.id} paddingY={1} xs={4}>
                <Card
                  sx={{
                    maxWidth: 345,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardHeader
                    title={
                      trainer?.user_set[0]?.first_name &&
                      trainer?.user_set[0]?.last_name
                        ? trainer?.user_set[0]?.first_name +
                          " " +
                          trainer?.user_set[0]?.last_name
                        : trainer?.user_set[0]?.email
                    }
                    subheader={
                      trainer?.user_set[0]?.birth_date
                        ? trainer?.user_set[0]?.birth_date
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
                    <Typography>
                      {"Bemutatkozás: " + trainer?.biography}
                    </Typography>
                    <Typography>
                      {trainer?.user_set[0]?.sex ? "Férfi" : "Nő"}
                    </Typography>
                    <Typography>
                      {"Egy óra edzés ára: " + trainer?.price_per_hour + " Ft"}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox checked={trainer?.is_available_online} />
                      }
                      disabled
                      label={"Online is elérhető az edzés anyag"}
                      sx={{ pl: 1 }}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={trainer?.is_dietician} />}
                      disabled
                      label={"Dietetikus"}
                      sx={{ pl: 1 }}
                    />
                    <Grid alignItems={"center"} container spacing={1} xs={12}>
                      {trainer?.user_set?.[0]?.usersport_set.map(
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
                      onClick={() => handleConnection(true, trainer?.id)}
                    >
                      <DoneOutlineIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      aria-label={"Don't connect"}
                      color={"error"}
                      onClick={() => handleConnection(false, trainer?.id)}
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
          count={Math.ceil(trainers.length / 3)}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </Grid>
    </Grid>
  );
}
