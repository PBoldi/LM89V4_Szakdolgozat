import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function SearchTrainer() {
  const athletes = useLoaderData();

  console.log(athletes);

  return (
    <Fragment>
      {athletes?.map((athlete) => (
        <Card key={athlete?.id} sx={{ maxWidth: 345 }}>
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
          <CardContent>
            <Typography>
              {athlete?.user_set[0]?.sex ? "Férfi" : "Nő"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
