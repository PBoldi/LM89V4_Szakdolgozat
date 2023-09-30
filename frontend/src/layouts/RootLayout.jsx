import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Outlet, useLoaderData } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <Outlet context={{ user }} />
        </div>
      </Container>
      <Footer />
    </LocalizationProvider>
  );
}
