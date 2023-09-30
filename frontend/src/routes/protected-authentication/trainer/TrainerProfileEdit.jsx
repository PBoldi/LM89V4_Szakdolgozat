import { useState } from "react";
import { Form, useLoaderData, useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

export default function UserProfileEdit() {
  const { pathname } = useLocation();
  const trainerProfile = useLoaderData();

  const [biography, setBiography] = useState(trainerProfile?.biography ?? "");
  const [certificate, setCertificate] = useState("");
  const [isAvailableOnline, setIsAvaliableOnline] = useState(
    trainerProfile?.is_available_online ?? ""
  );
  const [isDietician, setIsDietician] = useState(
    trainerProfile?.is_dietician ?? ""
  );
  const [pricePerHour, setPricePerHour] = useState(
    trainerProfile?.price_per_hour ?? 0
  );

  async function handleChange(event) {
    const file = event.target.files?.[0];
    setCertificate(file);
  }

  return (
    <Grid container disableEqualOverflow justifyContent={"center"} p={1}>
      <Grid xs={12}>
        <Form action={pathname} encType={"multipart/form-data"} method={"post"}>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Input
                  inputProps={{ accept: "image/png, image/jpeg" }}
                  name={"certificate"}
                  onChange={handleChange}
                  type={"file"}
                />
              }
              label={"Tanusítvány"}
              sx={{ p: 2 }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              inputProps={{ maxLength: 1000 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    {biography.length}/1000
                  </InputAdornment>
                ),
              }}
              label={"Magamról"}
              multiline
              name={"biography"}
              onChange={(event) => setBiography(event.target.value)}
              placeholder={"Magamról"}
              value={biography}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              inputProps={{ min: 0 }}
              label={"Óránkénti ár"}
              name={"price_per_hour"}
              onChange={(event) => setPricePerHour(event.target.value)}
              placeholder={"Óránkénti ár"}
              type={"number"}
              value={pricePerHour}
            />
          </Grid>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAvailableOnline}
                  name={"is_available_online"}
                  onClick={() => setIsAvaliableOnline(!isAvailableOnline)}
                />
              }
              label={"Online is elérhető az edzésem"}
              sx={{ pl: 1 }}
            />
          </Grid>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDietician}
                  name={"is_dietician"}
                  onClick={() => setIsDietician(!isDietician)}
                />
              }
              label={"Étrendet is tudok készíteni (dietetikus vagyok)"}
              sx={{ pl: 1 }}
            />
          </Grid>
          <Grid paddingY={1} xs={12}>
            <LoadingButton
              loading={["loading", "submitting"].includes(navigation.state)}
            >
              {"Mentés"}
            </LoadingButton>
          </Grid>
        </Form>
      </Grid>
    </Grid>
  );
}
