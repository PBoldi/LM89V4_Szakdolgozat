import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Grid container justifyContent={"center"}>
      <Typography variant={"h4"}>
        Üdvözlünk a Training Assistor oldalán!
      </Typography>
      <Typography>
        Keress magadnak edzőtársat vagy edzőt a program segítségével, amennyiben
        edző vagy készíts magadnak edzői profilt!
      </Typography>
    </Grid>
  );
}
