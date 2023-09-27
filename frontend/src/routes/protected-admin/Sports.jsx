import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function SearchTrainer() {
  const sports = useLoaderData();

  return (
    <Fragment>
      <List sx={{ width: "50%" }}>
        {sports?.map((sport) => (
          <ListItem
            key={sport?.id}
            secondaryAction={
              <IconButton edge={"end"} aria-label={"delete"}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <SportsSoccerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={sport?.name} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}
