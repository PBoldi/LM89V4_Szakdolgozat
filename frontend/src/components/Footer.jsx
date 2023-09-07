import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <AppBar
      position={"fixed"}
      color={"primary"}
      style={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <Typography color={"inherit"}>
          &copy; {new Date().getFullYear()} Training Assistor
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
