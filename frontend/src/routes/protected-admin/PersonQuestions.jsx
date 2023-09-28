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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default function PersonQuestions() {
  const personQuestions = useLoaderData();

  return (
    <Fragment>
      <List sx={{ width: "50%" }}>
        <ListItemButton component={Link} to={"create"}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Új kérdés felvétele"} />
        </ListItemButton>
        {personQuestions?.map((personQuestion) => (
          <ListItem
            key={personQuestion?.id}
            secondaryAction={
              <IconButton edge={"end"} aria-label={"delete"}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <QuestionMarkIcon />
            </ListItemIcon>
            <ListItemText
              primary={personQuestion?.question}
              secondary={personQuestion?.weight}
            />
          </ListItem>
        ))}
      </List>
      <Outlet />
    </Fragment>
  );
}
