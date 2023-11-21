import { Fragment, useEffect, useState } from "react";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import FilterTrainersDialog from "../../../components/FilterTrainersDialog";
import NoProfilePicture from "../../../assets/images/NoProfilePicture.png";

export default function SearchTrainer() {
  const trainersLoader = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [sex, setSex] = useState("all");
  const [isAvailableOnline, setIsAvailableOnline] = useState("all");
  const [isDietician, setIsDietician] = useState("all");
  const [pricePerHourMax, setPricePerHourMax] = useState(null);
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

  useEffect(() => {
    const trainersTemp = trainersLoader?.filter((trainer) =>
      city?.length
        ? trainer?.city?.toLowerCase()?.includes(city?.toLowerCase())
        : true &&
          (sex !== "all" ? trainer?.user?.sex === sex : true) &&
          (isAvailableOnline !== "all"
            ? trainer?.is_available_online === isAvailableOnline
            : true) &&
          (isDietician !== "all"
            ? trainer?.is_dietician === isDietician
            : true) &&
          (pricePerHourMax !== null
            ? trainer?.price_per_hour < pricePerHourMax
            : true)
    );
    setTrainers(trainersTemp);
  }, [city, sex, isAvailableOnline, isDietician, pricePerHourMax]);

  function handleFilterDefault() {
    setCity("");
    setSex("all");
    setIsAvailableOnline("all");
    setIsDietician("all");
    setPricePerHourMax(null);
  }

  return (
    <Fragment>
      <FilterTrainersDialog
        city={city}
        isAvailableOnline={isAvailableOnline}
        isDietician={isDietician}
        open={open}
        pricePerHourMax={pricePerHourMax}
        setCity={setCity}
        setIsAvailableOnline={setIsAvailableOnline}
        setIsDietician={setIsDietician}
        setOpen={setOpen}
        setPricePerHourMax={setPricePerHourMax}
        setSex={setSex}
        sex={sex}
      />
      <Grid container xs={8}>
        <IconButton
          color={"secondary"}
          onClick={() => setOpen(true)}
          variant={"filled"}
        >
          <FilterAltIcon sx={{ mr: 1 }} />
          Szűrés
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color={"secondary"}
          onClick={handleFilterDefault}
          variant={"filled"}
        >
          Szűrők alaphelyzetbe
          <FilterAltOffIcon sx={{ ml: 1 }} />
        </IconButton>
      </Grid>
      {trainers?.length ? (
        <Fragment>
          <Grid
            alignItems={"center"}
            container
            spacing={2}
            style={{
              animation: "fadeIn 1.5s",
            }}
            xs={8}
          >
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
                      height={"240"}
                      src={trainer?.user?.profile_picture ?? NoProfilePicture}
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
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: item.page === currentPage ? "#92817A" : "",
                  }}
                />
              )}
              size={"large"}
            />
          </Grid>
        </Fragment>
      ) : (
        <Grid container justifyContent={"center"} xs={12}>
          <Typography color={"white"} variant={"h3"}>
            Nincsenek megjeleníthető edzők
          </Typography>
        </Grid>
      )}
    </Fragment>
  );
}
