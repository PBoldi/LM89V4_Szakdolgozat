import { useEffect, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useLocation,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function AthleteTrainers() {
  const trainersLoader = useLoaderData();
  const data = useActionData();
  const pathname = useLocation();

  const { user } = useOutletContext();
  const submit = useSubmit();

  const [trainers, setTrainers] = useState(trainersLoader);

  function handleRatingChange(trainerId, value, trainerRatingId) {
    if (trainerRatingId) {
      submit(
        {
          id: trainerRatingId,
          rating: value,
        },
        { action: "trainer-rating/update", method: "post" }
      );
    } else {
      submit(
        {
          athlete_profile: user?.athleteprofile?.id,
          rating: value,
          trainer_profile: trainerId,
        },
        { action: pathname, method: "post" }
      );
    }

    const trainersTemp = trainers.map((trainer) =>
      trainer?.id === trainerId
        ? {
            ...trainer,
            trainer_user_rating: {
              ...trainer?.trainer_user_rating,
              rating: value,
            },
          }
        : { ...trainer }
    );
    setTrainers(trainersTemp);
  }

  useEffect(() => {
    if (data) {
      const trainersTemp = trainers.map((trainer) =>
        trainer?.id === data?.trainer_profile
          ? {
              ...trainer,
              trainer_user_rating: data,
            }
          : { ...trainer }
      );
      setTrainers(trainersTemp);
    }
  }, [JSON.stringify(data)]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label={"Trainers table"}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Név vagy e-mail</TableCell>
            <TableCell>Bemutatkozás</TableCell>
            <TableCell align={"center"}>Születési dátum</TableCell>
            <TableCell align={"center"}>Lakhely</TableCell>
            <TableCell align={"center"}>Neme</TableCell>
            <TableCell align={"center"}>Online edzés anyag</TableCell>
            <TableCell align={"center"}>Dietetikus</TableCell>
            <TableCell align={"center"}>Egy óra edzés ára</TableCell>
            <TableCell align={"right"}>Értékelésem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow
              key={trainer.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {
                  <Avatar
                    alt={trainer?.user?.email}
                    src={trainer?.user?.profile_picture}
                    sx={{ mr: 2 }}
                  >
                    {trainer?.user?.email?.[0]}
                  </Avatar>
                }
              </TableCell>
              <TableCell>
                {trainer?.user?.full_name ?? trainer?.user?.email}
              </TableCell>
              <TableCell>
                {trainer?.biography?.length
                  ? trainer?.biography
                  : "Nincs bemutatkozás megadva"}
              </TableCell>

              <TableCell align={"center"}>
                {trainer?.user?.birth_date ?? "Nincs születési dátum megadva"}
              </TableCell>
              <TableCell>
                {trainer?.user?.city?.length
                  ? trainer?.user?.city
                  : "Nincs lakhely megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {trainer?.user?.sex ? <MaleIcon /> : <FemaleIcon />}
              </TableCell>
              <TableCell align={"center"}>
                {trainer?.is_available_online ? (
                  <DoneOutlineIcon color={"success"} />
                ) : (
                  <CloseIcon color={"error"} />
                )}
              </TableCell>
              <TableCell align={"center"}>
                {trainer?.is_dietician ? (
                  <DoneOutlineIcon color={"success"} />
                ) : (
                  <CloseIcon color={"error"} />
                )}
              </TableCell>
              <TableCell align={"center"}>{trainer?.price_per_hour}</TableCell>
              <TableCell align={"right"}>
                <Rating
                  value={trainer?.trainer_user_rating?.rating}
                  onChange={(_, value) => {
                    handleRatingChange(
                      trainer?.id,
                      value,
                      trainer?.trainer_user_rating?.id
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
