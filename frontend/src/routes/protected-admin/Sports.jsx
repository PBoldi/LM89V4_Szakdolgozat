import { Fragment } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function Sports() {
  const sports = useLoaderData();

  return (
    <Fragment>
      <List sx={{ width: "50%" }}>
        <ListItemButton component={Link} to={"create"}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Új sport felvétele"} />
        </ListItemButton>
        {sports?.map((sport) => (
          <ListItem
            key={sport?.id}
            secondaryAction={
              <IconButton edge={"end"} aria-label={"delete"}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <SportsSoccerIcon />
            </ListItemIcon>
            <ListItemText primary={sport?.name} />
          </ListItem>
        ))}
      </List>
      <Outlet />
    </Fragment>
  );
}
