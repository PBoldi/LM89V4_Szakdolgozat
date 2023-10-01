import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function SearchTrainer() {
  const trainers = useLoaderData();
  const { user } = useOutletContext();
  const submit = useSubmit();

  function handleConnection(connect, trainerProfileId) {
    submit(
      { connect: connect, trainer_profile: trainerProfileId, user: user?.id },
      { method: "post" }
    );
  }

  return (
    <Fragment>
      {trainers?.map((trainer) => (
        <Card key={trainer?.id} sx={{ maxWidth: 345 }}>
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
            <Typography>{"Bemutatkozás: " + trainer?.biography}</Typography>
            <Typography>
              {trainer?.user_set[0]?.sex ? "Férfi" : "Nő"}
            </Typography>
            <Typography>
              {"Óránkénti ár: " + trainer?.price_per_hour}
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={trainer?.is_available_online} />}
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
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label={"Connect"}
              onClick={() => handleConnection(true, trainer?.id)}
            >
              <DoneOutlineIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              aria-label={"Don't connect"}
              onClick={() => handleConnection(false, trainer?.id)}
            >
              <CloseIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Fragment>
  );
}
