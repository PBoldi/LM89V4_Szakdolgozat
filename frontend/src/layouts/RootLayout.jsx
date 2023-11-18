import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Unstable_Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SportBackground from "../assets/images/SportBackground.jpg";

import "../styles.scss";

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
    <div
      style={{
        backgroundImage: `url(${SportBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Navbar user={user} />
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            overflowY: "auto",
            opacity: 0.97,
            minHeight: "100vh",
          }}
          paddingY={10}
        >
          <Grid container justifyContent={"center"} xs={10}>
            <Outlet context={{ user }} />
          </Grid>
        </Grid>
        <Footer />
      </LocalizationProvider>
    </div>
  );
}
