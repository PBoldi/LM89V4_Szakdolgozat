import { useMemo, useState } from "react";
import {
  Form,
  useLocation,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import format from "date-fns/format";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function UserProfileEdit() {
  const { pathname } = useLocation();
  const { state } = useNavigation();
  const { user } = useOutletContext();

  const [birthDate, setBirthDate] = useState(
    user?.birth_date ? new Date(user.birth_date) : null
  );

  const [city, setCity] = useState(user?.city ?? "");
  const [facebookContact, setFacebookContact] = useState(
    user?.facebook_contact
  );
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [instagramContact, setInstagramContact] = useState(
    user?.instagram_contact
  );
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [linkedinContact, setLinkedinContact] = useState(
    user?.linkedin_contact
  );
  const [otherContact, setOtherContact] = useState(user?.other_contact);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [profilePicture, setProfilePicture] = useState("");
  const [sex, setSex] = useState(user?.sex ?? "");

  const profilePicturePreview = useMemo(
    () =>
      profilePicture
        ? URL.createObjectURL(profilePicture)
        : user?.profile_picture ?? "",
    [profilePicture?.lastModified, user?.profile_picture]
  );

  async function handleChange(event) {
    const file = event.target.files?.[0];
    setProfilePicture(file);
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      style={{
        animation: "fadeIn 1.5s",
      }}
    >
      <Grid md={6} xs={12}>
        <Paper>
          <Form
            action={pathname}
            encType={"multipart/form-data"}
            method={"post"}
            style={{ padding: 15 }}
          >
            {!isNaN(Date.parse(birthDate)) ? (
              <input
                defaultValue={
                  birthDate ? format(birthDate, "yyyy-MM-dd") : null
                }
                name={"birth_date"}
                type={"hidden"}
              />
            ) : null}
            <input defaultValue={user?.id} name={"id"} type={"hidden"} />
            <Grid container justifyContent={"center"} spacing={1} xs={12}>
              <Avatar
                alt={user?.email}
                src={profilePicturePreview}
                sx={{ height: 256, width: 256 }}
              >
                {user?.email?.[0]}
              </Avatar>
              <Grid xs={12}>
                <FormControl>
                  <OutlinedInput
                    inputProps={{ accept: "image/png, image/jpeg" }}
                    name={"profile_picture"}
                    onChange={handleChange}
                    type={"file"}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  defaultValue={user?.email}
                  disabled
                  label={"E-mail"}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Vezetéknév"}
                  name={"last_name"}
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Keresztnév"}
                  name={"first_name"}
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Lakhely"}
                  name={"city"}
                  onChange={(event) => setCity(event.target.value)}
                  value={city}
                />
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel>{"Neme"}</InputLabel>
                  <Select
                    label={"Neme"}
                    name={"sex"}
                    onChange={(event) => setSex(event.target.value)}
                    value={sex}
                  >
                    <MenuItem value={true}>{"Férfi"}</MenuItem>
                    <MenuItem value={false}>{"Nő"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <DatePicker
                  disableFuture
                  label={"Születési dátum"}
                  onChange={(value) => setBirthDate(value)}
                  value={birthDate}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Telefonszám"}
                  name={"phone_number"}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Facebook link"}
                  name={"facebook_contact"}
                  onChange={(event) => setFacebookContact(event.target.value)}
                  value={facebookContact}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Instagram link"}
                  name={"instagram_contact"}
                  onChange={(event) => setInstagramContact(event.target.value)}
                  value={instagramContact}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Linkedin link"}
                  name={"linkedin_contact"}
                  onChange={(event) => setLinkedinContact(event.target.value)}
                  value={linkedinContact}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label={"Egyéb elérhetőség (link)"}
                  name={"other_contact"}
                  onChange={(event) => setOtherContact(event.target.value)}
                  value={otherContact}
                />
              </Grid>
              <Grid paddingY={1} xs={12}>
                <LoadingButton
                  loading={["loading", "submitting"].includes(state)}
                >
                  {"Mentés"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
