import Grid from "@mui/material/Unstable_Grid2";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function RootLayout() {
  const user = useLoaderData();

  useEffect(() => {
    const refresh = new URLSearchParams(window.location.search).get("refresh");
    const access = new URLSearchParams(window.location.search).get("access");
    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    }
  }, []);

  return (
    <Grid container xs={12}>
      <Grid xs={12}>{/* navbar */}</Grid>
      <Grid xs={12}>
        <Outlet context={{ user }} />
      </Grid>
      <Grid xs={12}>{/* footer */}</Grid>
    </Grid>
  );
}
