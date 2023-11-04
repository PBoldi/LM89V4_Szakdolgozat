import { useState } from "react";
import { useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
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

  const { user } = useOutletContext();
  const submit = useSubmit();

  const [trainers, setTrainers] = useState(trainersLoader);
  const [value, setValue] = useState(2);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label={"Trainers table"}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Név vagy e-mail</TableCell>
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
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
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
