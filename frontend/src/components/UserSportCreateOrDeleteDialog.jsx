import { Form, useLocation, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

export default function UserSportCreateOrDeleteDialog({
  open,
  setOpen,
  sports,
  user,
  userSports,
}) {
  const { pathname } = useLocation();
  const submit = useSubmit();

  function handleSubmit(isCreate, sportId, userSportId) {
    if (isCreate) {
      submit(
        { pathname: pathname, sport: sportId, user: user?.id },
        { action: "/user-sport/create", method: "post" }
      );
    } else {
      submit(
        { pathname: pathname, id: userSportId },
        { action: "/user-sport/delete", method: "post" }
      );
    }
  }

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
                secondaryAction={
                  <Checkbox
                    checked={
                      userSports?.find(
                        (userSport) => userSport?.sport === sports[index]?.id
                      )
                        ? true
                        : false
                    }
                    onClick={(event) =>
                      handleSubmit(
                        event.target.checked,
                        sports[index]?.id,
                        userSports?.find(
                          (userSport) => userSport?.sport === sports[index]?.id
                        )?.id
                      )
                    }
                  />
                }
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
