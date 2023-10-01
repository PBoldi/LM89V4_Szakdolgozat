import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import AthleteProfile from "./routes/protected-authentication/profile-choose/AthleteProfile";
import AthleteProfileEdit from "./routes/protected-authentication/athlete/AthleteProfileEdit";
import Login from "./routes/authentication/Login";
import PersonQuestionCreate from "./routes/protected-admin/PersonQuestionCreate";
import PersonQuestionDelete from "./routes/protected-admin/PersonQuestionDelete";
import PersonQuestionEdit from "./routes/protected-admin/PersonQuestionEdit";
import PersonQuestions from "./routes/protected-admin/PersonQuestions";
import Registration from "./routes/authentication/Registration";
import SearchAthlete from "./routes/protected-authentication/athlete/SearchAthlete";
import SearchTrainer from "./routes/protected-authentication/athlete/SearchTrainer";
import SportCreate from "./routes/protected-admin/SportCreate";
import SportDelete from "./routes/protected-admin/SportDelete";
import SportEdit from "./routes/protected-admin/SportEdit";
import Sports from "./routes/protected-admin/Sports";
import TrainerProfile from "./routes/protected-authentication/profile-choose/TrainerProfile";
import TrainerProfileEdit from "./routes/protected-authentication/trainer/TrainerProfileEdit";
import UserProfileEdit from "./routes/protected-authentication/UserProfileEdit";

import AthleteLayout from "./layouts/AthleteLayout";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import ProtectedAuthenticationLayout from "./layouts/ProtectedAuthenticationLayout";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import ProfileChooseLayout from "./layouts/ProfileChooseLayout";
import RootLayout from "./layouts/RootLayout";
import TrainerLayout from "./layouts/TrainerLayout";

import theme from "./utilities/theme";

import {
  athleteProfileCreateAction,
  createPersonQuestionAction,
  createSportAction,
  deletePersonQuestionAction,
  deleteSportAction,
  editAthleteProfileAction,
  editPersonQuestionAction,
  editSportAction,
  editTrainerProfileAction,
  editUserProfileAction,
  loginAction,
  logOutAction,
  registrationAction,
  trainerProfileCreateAction,
  userAthleteConnectionAction,
  userTrainerConnectionAction,
} from "./utilities/actions";

import {
  athleteProfileLoader,
  personQuestionLoader,
  personQuestionsLoader,
  rootLayoutLoader,
  searchAthletesLoader,
  searchTrainersLoader,
  sportLoader,
  sportsLoader,
  trainerProfileLoader,
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
          },
          {
            path: "athlete",
            element: <AthleteLayout />,
            children: [
              {
                path: ":id/athlete-profile",
                element: <AthleteProfileEdit />,
                action: editAthleteProfileAction,
                loader: athleteProfileLoader,
              },
              {
                path: "search-athlete",
                element: <SearchAthlete />,
                action: userAthleteConnectionAction,
                loader: searchAthletesLoader,
              },
              {
                path: "search-trainer",
                element: <SearchTrainer />,
                action: userTrainerConnectionAction,
                loader: searchTrainersLoader,
              },
            ],
          },
          {
            path: "trainer",
            element: <TrainerLayout />,
            children: [
              {
                path: ":id/trainer-profile",
                element: <TrainerProfileEdit />,
                action: editTrainerProfileAction,
                loader: trainerProfileLoader,
              },
            ],
          },
          {
            path: "user-profile",
            element: <UserProfileEdit />,
            action: editUserProfileAction,
          },

          {
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
                  {
                    path: ":id/delete",
                    element: <SportDelete />,
                    loader: sportLoader,
                    action: deleteSportAction,
                  },
                  {
                    path: ":id/edit",
                    element: <SportEdit />,
                    loader: sportLoader,
                    action: editSportAction,
                  },
                ],
              },
              {
                path: "person-questions",
                element: <PersonQuestions />,
                loader: personQuestionsLoader,
                children: [
                  {
                    path: "create",
                    element: <PersonQuestionCreate />,
                    action: createPersonQuestionAction,
                  },
                  {
                    path: ":id/delete",
                    element: <PersonQuestionDelete />,
                    loader: personQuestionLoader,
                    action: deletePersonQuestionAction,
                  },
                  {
                    path: ":id/edit",
                    element: <PersonQuestionEdit />,
                    loader: personQuestionLoader,
                    action: editPersonQuestionAction,
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
