import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function SearchTrainer() {
  const trainers = useLoaderData();
  return (
    <Fragment>
      {trainers?.map((trainer) => (
        <Card key={trainer?.id} sx={{ maxWidth: 345 }}>
          <CardHeader
            title={trainer?.user?.full_name ?? trainer?.user?.email ?? "name"}
            subheader={
              trainer?.user?.birth_date
                ? new Date(trainer?.user?.birth_date)
                : "no date given"
            }
          />
          <CardMedia
            component={"img"}
            height={"194"}
            image={trainer?.certificate}
            alt={"certificate"}
          />
          <CardContent>
            <Typography>{trainer?.biography}</Typography>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
