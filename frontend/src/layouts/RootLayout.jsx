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
        <Container
          maxWidth={"lg"}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Grid
            style={{
              alignItems: "center",
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "auto",
              opacity: 0.97,
            }}
            paddingY={10}
          >
            <Outlet context={{ user }} />
          </Grid>
        </Container>
        <Footer />
      </LocalizationProvider>
    </div>
  );
}
