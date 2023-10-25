import { Fragment } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default function PersonQuestions() {
  const personQuestions = useLoaderData();

  return (
    <Fragment>
      <List
        sx={{
          width: "60%",
        }}
      >
        <ListItemButton component={Link} to={"create"}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Új kérdés felvétele"} />
        </ListItemButton>
        <Paper
          elevation={0}
          sx={{
            overflow: "auto",
            maxHeight: 550,
          }}
        >
          {personQuestions?.map((personQuestion) => (
            <ListItem
              key={personQuestion?.id}
              secondaryAction={
                <Fragment>
                  <IconButton
                    aria-label={"edit"}
                    component={Link}
                    edge={"end"}
                    sx={{ mr: 1 }}
                    to={`${personQuestion?.id}/edit`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={"delete"}
                    component={Link}
                    edge={"end"}
                    to={`${personQuestion?.id}/delete`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Fragment>
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
        </Paper>
      </List>
      <Outlet />
    </Fragment>
  );
}
