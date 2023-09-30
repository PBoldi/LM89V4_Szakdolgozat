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
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function UserProfileEdit() {
  const { pathname } = useLocation();
  const { state } = useNavigation();
  const { user } = useOutletContext();

  const [birthDate, setBirthDate] = useState(
    user?.birth_date ? new Date(user.birth_date) : null
  );

  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
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
    <Grid container disableEqualOverflow justifyContent={"center"} p={1}>
      <Grid md={6} xs={12}>
        <Form action={pathname} encType={"multipart/form-data"} method={"post"}>
          {!isNaN(Date.parse(birthDate)) ? (
            <input
              defaultValue={birthDate ? format(birthDate, "yyyy-MM-dd") : null}
              name={"birth_date"}
              type={"hidden"}
            />
          ) : null}
          <input defaultValue={user?.id} name={"id"} type={"hidden"} />
          <Grid container justifyContent={"center"} xs={12}>
            <Avatar
              alt={user?.email}
              src={profilePicturePreview}
              sx={{ height: 256, width: 256 }}
            >
              {user?.email?.[0]}
            </Avatar>
          </Grid>
          <FormControl>
            <OutlinedInput
              inputProps={{ accept: "image/png, image/jpeg" }}
              name={"profile_picture"}
              onChange={handleChange}
              type={"file"}
            />
          </FormControl>
          <TextField defaultValue={user?.email} disabled label={"E-mail"} />
          <TextField
            label={"Vezetéknév"}
            name={"last_name"}
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
          <TextField
            label={"Keresztnév"}
            name={"first_name"}
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
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
          <DatePicker
            disableFuture
            label={"Születési dátum"}
            onChange={(value) => setBirthDate(value)}
            value={birthDate}
          />
          <Grid paddingY={1} xs={12}>
            <LoadingButton loading={["loading", "submitting"].includes(state)}>
              {"Mentés"}
            </LoadingButton>
          </Grid>
        </Form>
      </Grid>
    </Grid>
  );
}
