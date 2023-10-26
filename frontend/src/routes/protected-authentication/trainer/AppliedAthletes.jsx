import { useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

export default function AppliedAthletes() {
  const appliedAthletesLoader = useLoaderData();

  const [athletes, setAthlets] = useState(appliedAthletesLoader);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

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
