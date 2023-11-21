import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";

export default function FilterTrainersDialog({
  city,
  isAvailableOnline,
  isDietician,
  open,
  pricePerHourMax,
  setCity,
  setIsAvailableOnline,
  setIsDietician,
  setOpen,
  setPricePerHourMax,
  setSex,
  sex,
}) {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Edzők szűrése</DialogTitle>
      <DialogContent>
        <TextField
          label={"Lakhely"}
          onChange={(event) => setCity(event.target.value)}
          value={city}
        />
        <FormControl>
          <InputLabel>{"Neme"}</InputLabel>
          <Select
            label={"Neme"}
            name={"sex"}
            onChange={(event) => setSex(event.target.value)}
            value={sex}
          >
            <MenuItem value={"all"}>Mindegy</MenuItem>
            <MenuItem value={true}>Férfi</MenuItem>
            <MenuItem value={false}>Nő</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>{"Online edzésanyag"}</InputLabel>
          <Select
            label={"Online edzésanyag"}
            onChange={(event) => setIsAvailableOnline(event.target.value)}
            value={isAvailableOnline}
          >
            <MenuItem value={"all"}>Mindegy</MenuItem>
            <MenuItem value={true}>Elérhető</MenuItem>
            <MenuItem value={false}>Nem érhető el</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>{"Dietetikus"}</InputLabel>
          <Select
            label={"Dietetikus"}
            onChange={(event) => setIsDietician(event.target.value)}
            value={isDietician}
          >
            <MenuItem value={"all"}>Mindegy</MenuItem>
            <MenuItem value={true}>Igen</MenuItem>
            <MenuItem value={false}>Nem</MenuItem>
          </Select>
        </FormControl>
        <TextField
          defaultValue={pricePerHourMax}
          label={"Maximális ár óránként"}
          min={0}
          onChange={(event) => setPricePerHourMax(event.target.value)}
          type={"number"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant={"outlined"}>
          Bezárás
        </Button>
      </DialogActions>
    </Dialog>
  );
}
