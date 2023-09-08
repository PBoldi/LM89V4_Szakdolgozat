import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import AthleteProfile from "./routes/protected-authentication/profile-choose/AthleteProfile";
import TrainerProfile from "./routes/protected-authentication/profile-choose/TrainerProfile";
import Login from "./routes/authentication/Login";
import Registration from "./routes/authentication/Registration";

import AuthenticationLayout from "./layouts/AuthenticationLayout";
import ProtectedAuthenticationLayout from "./layouts/ProtectedAuthenticationLayout";
import ProfileChooseLayout from "./layouts/ProfileChooseLayout";
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
      {
        element: <ProtectedAuthenticationLayout />,
        children: [
          {
            path: "profile-choose",
            element: <ProfileChooseLayout />,
            children: [
              { path: "athlete-profile", element: <AthleteProfile /> },
              {
                path: "trainer-profile",
                element: <TrainerProfile />,
              },
            ],
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
