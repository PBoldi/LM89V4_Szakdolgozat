import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Grid
      container
      justifyContent={"center"}
      style={{ animation: "fadeIn 1.5s" }}
      spacing={2}
    >
      <Grid>
        <Typography color={"white"} textAlign={"center"} variant={"h3"}>
          Üdvözlünk a Training Assistor oldalán!
        </Typography>
      </Grid>
      <Grid>
        <Typography color={"white"} textAlign={"center"} variant={"h5"}>
          Keress magadnak edzőtársat vagy edzőt a program segítségével,
          amennyiben edző vagy készíts magadnak edzői profilt!
        </Typography>
      </Grid>
    </Grid>
  );
}
