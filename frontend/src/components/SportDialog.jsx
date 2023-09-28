import { useState } from "react";
import {
  Form,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function SportDialog({ sport }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useNavigation();

  const [name, setName] = useState(sport?.name ?? "");

  return (
    <Dialog onClose={() => navigate("/admin/sports")} open>
      <DialogTitle>
        {pathname?.includes("delete")
          ? "Sport törlése"
          : pathname?.includes("edit")
          ? "Sport szerkesztése"
          : "Sport létrehozása"}
      </DialogTitle>
      <Form action={pathname} method={"post"}>
        <DialogContent>
          <TextField
            disabled={pathname?.includes("delete")}
            label={"Sport megnevezése"}
            name={"name"}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color={pathname?.includes("delete") ? "error" : "primary"}
            disabled={pathname?.includes("delete") ? false : !name?.length}
            loading={["loading", "submitting"].includes(state)}
          >
            {pathname?.includes("delete") ? "Törlés" : "Mentés"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
