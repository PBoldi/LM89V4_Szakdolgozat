import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLocation,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
  useSubmit,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Slider from "@mui/material/Slider";
import { FixedSizeList } from "react-window";

export default function PersonQuestionWeighing() {
  const { personQuestionsLoader, personQuestionWeighingsLoader } =
    useLoaderData();

  const data = useActionData();
  const { pathname } = useLocation();
  const { user } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [personQuestions, setPersonQuestions] = useState(personQuestionsLoader);

  const [personQuestionWeighings, setPersonQuestionWeighings] = useState(
    personQuestionWeighingsLoader
  );

  useEffect(() => {
    if (
      data &&
      !personQuestionWeighings?.find(
        (personQuestionWeighing) => personQuestionWeighing?.id === data?.id
      )
    ) {
      setPersonQuestionWeighings((current) => [...current, data]);
    }
  }, [JSON.stringify(data)]);

  function handleSliderChange(
    weight,
    personQuestionId,
    personQuestionWeighingId
  ) {
    submit(
      {
        athlete_profile: user?.athleteprofile?.id,
        person_question: personQuestionId,
        weight: weight,
        pathname: pathname,
        personQuestionWeighingId: personQuestionWeighingId,
      },
      {
        action: personQuestionWeighingId
          ? `/athlete/${id}/athlete-profile/person-question-weighings/edit`
          : `/athlete/${id}/athlete-profile/person-question-weighings`,
        method: "post",
      }
    );
    if (personQuestionWeighingId) {
      const tempPersonQuestionWeighings = personQuestionWeighings?.map(
        (personQuestionWeighing) =>
          personQuestionWeighing?.id === personQuestionWeighingId
            ? { ...personQuestionWeighing, weight: weight }
            : personQuestionWeighing
      );

      setPersonQuestionWeighings(tempPersonQuestionWeighings);
    }
  }

  return (
    <Dialog
      onClose={() => navigate(`/athlete/${id}/athlete-profile`)}
      open={true}
    >
      <DialogTitle align={"center"}>{"Kérdések kitöltése"}</DialogTitle>
      <Form action={pathname} method={"post"}>
        <DialogContent>
          <FixedSizeList
            height={350}
            itemSize={70}
            itemCount={personQuestions?.length}
            overscanCount={1}
          >
            {({ index, style }) => (
              <ListItem
                key={personQuestions[index]?.id}
                sx={{ pl: 3, pr: 3 }}
                style={style}
              >
                <Grid container xs={12}>
                  <Grid xs={12}>
                    <ListItemText primary={personQuestions[index]?.question} />
                  </Grid>
                  <Grid xs={12}>
                    <Slider
                      aria-label="Small steps"
                      defaultValue={
                        personQuestionWeighings?.find(
                          (personQuestionWeighing) =>
                            personQuestionWeighing?.person_question ===
                            personQuestions[index]?.id
                        )?.weight
                      }
                      marks
                      max={5}
                      min={1}
                      onChangeCommitted={(_, value) =>
                        handleSliderChange(
                          value,
                          personQuestions[index]?.id,
                          personQuestionWeighings?.find(
                            (personQuestionWeighing) =>
                              personQuestionWeighing?.person_question ===
                              personQuestions[index]?.id
                          )?.id
                        )
                      }
                      step={1}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </ListItem>
            )}
          </FixedSizeList>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate(`/athlete/${id}/athlete-profile`)}
            variant={"outlined"}
          >
            Bezárás
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
