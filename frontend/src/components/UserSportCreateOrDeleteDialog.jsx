import { useState } from "react";
import {
  Form,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import { FixedSizeList } from "react-window";

export default function UserSportCreateOrDeleteDialog({
  open,
  setOpen,
  sports,
  user,
}) {
  const { pathname } = useLocation();

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle align={"center"}>
        {"Sportok amikkel foglalkozom"}
      </DialogTitle>
      <Form action={pathname} method={"post"}>
        <DialogContent>
          <FixedSizeList
            height={300}
            itemSize={50}
            itemCount={sports?.length}
            overscanCount={1}
          >
            {({ index, style }) => (
              <ListItem
                disablePadding
                key={sports[index]?.id}
                secondaryAction={<Checkbox></Checkbox>}
                style={style}
              >
                <ListItemText primary={sports[index]?.name} />
              </ListItem>
            )}
          </FixedSizeList>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant={"outlined"}>
            Bezárás
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
