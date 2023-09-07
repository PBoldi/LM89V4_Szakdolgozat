import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import About from "./routes/About";
import Login from "./routes/authentication/Login";
import Registration from "./routes/authentication/Registration";

import AuthenticationLayout from "./layouts/AuthenticationLayout";
import RootLayout from "./layouts/RootLayout";

import theme from "./utilities/theme";

import {
  loginAction,
  logOutAction,
  registrationAction,
} from "./utilities/actions";

import { rootLayoutLoader } from "./utilities/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLayoutLoader,
    children: [
      {
        path: "authentication",
        element: <AuthenticationLayout />,
        children: [
          { path: "login", element: <Login />, action: loginAction },
          {
            path: "registration",
            element: <Registration />,
            action: registrationAction,
          },
        ],
      },
      { path: "logout", action: logOutAction },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<p>Loading translations...</p>}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  );
}
