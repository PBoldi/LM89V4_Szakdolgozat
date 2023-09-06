import { createTheme } from "@mui/material/styles";
import { huHU } from "@mui/material/locale";

const sliderMarks = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
];

const theme = createTheme(
  {
    components: {
      MuiButton: { defaultProps: { fullWidth: true, variant: "contained" } },
      MuiDialog: { defaultProps: { fullWidth: true } },
      MuiFormControl: {
        defaultProps: { fullWidth: true, margin: "dense", size: "small" },
      },
      MuiLoadingButton: {
        defaultProps: { fullWidth: true, type: "submit", variant: "contained" },
      },
      MuiPaper: { defaultProps: { elevation: 8 } },
      MuiSlider: { defaultProps: { marks: sliderMarks, max: 6, min: 1 } },
      MuiTable: { defaultProps: { size: "small", stickyHeader: true } },
      MuiTabList: { defaultProps: { variant: "fullWidth" } },
      MuiTabPanel: { defaultProps: { sx: { p: 0 } } },
      MuiTabs: { defaultProps: { variant: "fullWidth" } },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          inputProps: { maxLength: 255 },
          margin: "dense",
          size: "small",
        },
      },
    },
    palette: {
      primary: { main: "#242943" },
      secondary: { main: "#50ADC9" },
      error: { main: "#AC112B" },
      warning: { main: "#EEC344" },
      info: { main: "#357ABE" },
      success: { main: "#2A8C46" },
    },
  },
  huHU
);

export default theme;
