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

export default function PersonQuestionDialog({ personQuestion }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useNavigation();

  const [question, setQuestion] = useState(personQuestion?.question ?? "");
  const [weight, setWeight] = useState(personQuestion?.weight ?? 1);

  return (
    <Dialog onClose={() => navigate("/admin/person-questions")} open>
      <DialogTitle>
        {pathname?.includes("delete")
          ? "Kérdés törlése"
          : pathname?.includes("edit")
          ? "Kérdés szerkesztése"
          : "Kérdés létrehozása"}
      </DialogTitle>
      <Form action={pathname} method={"post"}>
        <DialogContent>
          <TextField
            disabled={pathname?.includes("delete")}
            label={"A kérdés / állítás"}
            name={"question"}
            onChange={(event) => setQuestion(event.target.value)}
            value={question}
          />
          <TextField
            disabled={pathname?.includes("delete")}
            inputProps={{ min: 1, max: 5 }}
            label={"A kérdés / állítás súlya"}
            name={"weight"}
            onChange={(event) => setWeight(event.target.value)}
            type={"number"}
            value={weight}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color={pathname?.includes("delete") ? "error" : "primary"}
            disabled={pathname?.includes("delete") ? false : !question?.length}
            loading={["loading", "submitting"].includes(state)}
          >
            {pathname?.includes("delete") ? "Törlés" : "Mentés"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
