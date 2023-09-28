import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import AthleteProfile from "./routes/protected-authentication/profile-choose/AthleteProfile";
import TrainerProfile from "./routes/protected-authentication/profile-choose/TrainerProfile";
import Login from "./routes/authentication/Login";
import PersonQuestionCreate from "./routes/protected-admin/PersonQuestionCreate";
import PersonQuestions from "./routes/protected-admin/PersonQuestions";
import Registration from "./routes/authentication/Registration";
import SearchAthlete from "./routes/protected-authentication/athlete/SearchAthlete";
import SearchTrainer from "./routes/protected-authentication/athlete/SearchTrainer";
import Sports from "./routes/protected-admin/Sports";
import SportCreate from "./routes/protected-admin/SportCreate";

import AthleteLayout from "./layouts/AthleteLayout";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import ProtectedAuthenticationLayout from "./layouts/ProtectedAuthenticationLayout";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import ProfileChooseLayout from "./layouts/ProfileChooseLayout";
import RootLayout from "./layouts/RootLayout";

import theme from "./utilities/theme";

import {
  athleteProfileCreateAction,
  createPersonQuestionAction,
  createSportAction,
  loginAction,
  logOutAction,
  registrationAction,
  trainerProfileCreateAction,
} from "./utilities/actions";

import {
  personQuestionLoader,
  rootLayoutLoader,
  searchAthletesLoader,
  searchTrainersLoader,
  sportsLoader,
} from "./utilities/loaders";

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
              {
                path: "athlete-profile",
                element: <AthleteProfile />,
                action: athleteProfileCreateAction,
              },
              {
                path: "trainer-profile",
                element: <TrainerProfile />,
                action: trainerProfileCreateAction,
              },
            ],
            path: "athlete",
            element: <AthleteLayout />,
            children: [
              {
                path: "search-trainer",
                element: <SearchTrainer />,
                loader: searchTrainersLoader,
              },
              {
                path: "search-athlete",
                element: <SearchAthlete />,
                loader: searchAthletesLoader,
              },
            ],
            path: "admin",
            element: <ProtectedAdminLayout />,
            children: [
              {
                path: "sports",
                element: <Sports />,
                loader: sportsLoader,
                children: [
                  {
                    path: "create",
                    element: <SportCreate />,
                    action: createSportAction,
                  },
                ],
              },
              {
                path: "person-questions",
                element: <PersonQuestions />,
                loader: personQuestionLoader,
                children: [
                  {
                    path: "create",
                    element: <PersonQuestionCreate />,
                    action: createPersonQuestionAction,
                  },
                ],
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
