import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function SearchTrainer() {
  const trainers = useLoaderData();

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
        </Card>
      ))}
    </Fragment>
  );
}
