import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import FacebookIcon from "@mui/icons-material/Facebook";
import FemaleIcon from "@mui/icons-material/Female";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MaleIcon from "@mui/icons-material/Male";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TrainerAthletes() {
  const athletesLoader = useLoaderData();

  const [athletes, setAthletes] = useState(athletesLoader);

  return (
    <TableContainer
      component={Paper}
      style={{
        animation: "fadeIn 1.5s",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label={"Trainers table"}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Név vagy e-mail</TableCell>
            <TableCell align={"center"}>Születési idő</TableCell>
            <TableCell align={"center"}>Lakhely</TableCell>
            <TableCell align={"center"}>Neme</TableCell>
            <TableCell align={"center"}>Magasság</TableCell>
            <TableCell align={"center"}>Testsúly</TableCell>
            <TableCell align={"center"}>Bemutatkozás</TableCell>
            <TableCell align={"center"}>Telefonszám</TableCell>
            <TableCell align={"right"}>Elérhetőségek</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow
              key={athlete.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {
                  <Avatar
                    alt={athlete?.user?.email}
                    src={athlete?.user?.profile_picture}
                    sx={{ mr: 2 }}
                  >
                    {athlete?.user?.email?.[0]}
                  </Avatar>
                }
              </TableCell>
              <TableCell>
                {athlete?.user?.full_name ?? athlete?.user?.email}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.user?.birth_date ?? "Nincs születési dátum megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.user?.city?.length
                  ? athlete?.user?.city
                  : "Nincs lakhely megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.user?.sex ? <MaleIcon /> : <FemaleIcon />}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.height ?? "Nincs magasság megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.weight ?? "Nincs testsúly megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.biography?.length
                  ? athlete?.biography
                  : "Nincs bemutatkozás megadva"}
              </TableCell>
              <TableCell align={"center"}>
                {athlete?.user?.phone_number?.length
                  ? athlete?.user?.phone_number
                  : "Nincs telefonszám megadva"}
              </TableCell>
              <TableCell align={"right"}>
                {athlete?.user?.facebook_contact ? (
                  <IconButton
                    component={"a"}
                    href={athlete?.user?.facebook_contact}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    <FacebookIcon />
                  </IconButton>
                ) : null}
                {athlete?.user?.instagram_contact ? (
                  <IconButton
                    component={"a"}
                    href={athlete?.user?.instagram_contact}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    <InstagramIcon />
                  </IconButton>
                ) : null}
                {athlete?.user?.linkedin_contact ? (
                  <IconButton
                    component={"a"}
                    href={athlete?.user?.linkedin_contact}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    <LinkedInIcon />
                  </IconButton>
                ) : null}
                {athlete?.user?.other_contact ? (
                  <IconButton
                    component={"a"}
                    href={athlete?.user?.other_contact}
                    rel={"noreferrer"}
                    target={"_blank"}
                  >
                    <ContactSupportIcon />
                  </IconButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
