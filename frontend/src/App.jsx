import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import AppliedAthletes from "./routes/protected-authentication/trainer/AppliedAthletes";
import AthletePartners from "./routes/protected-authentication/athlete/AthletePartners";
import AthleteProfile from "./routes/protected-authentication/profile-choose/AthleteProfile";
import AthleteProfileEdit from "./routes/protected-authentication/athlete/AthleteProfileEdit";
import AthletesToBePartner from "./routes/protected-authentication/athlete/AthletesToBePartner";
import AthleteTrainers from "./routes/protected-authentication/athlete/AthleteTrainers";
import Home from "./routes/Home";
import Login from "./routes/authentication/Login";
import PersonQuestionCreate from "./routes/protected-admin/PersonQuestionCreate";
import PersonQuestionDelete from "./routes/protected-admin/PersonQuestionDelete";
import PersonQuestionEdit from "./routes/protected-admin/PersonQuestionEdit";
import PersonQuestions from "./routes/protected-admin/PersonQuestions";
import PersonQuestionWeighing from "./routes/protected-authentication/athlete/PersonQuestionWeighing";
import Registration from "./routes/authentication/Registration";
import SearchAthlete from "./routes/protected-authentication/athlete/SearchAthlete";
import SearchTrainer from "./routes/protected-authentication/athlete/SearchTrainer";
import SportCreate from "./routes/protected-admin/SportCreate";
import SportDelete from "./routes/protected-admin/SportDelete";
import SportEdit from "./routes/protected-admin/SportEdit";
import Sports from "./routes/protected-admin/Sports";
import TestFunctions from "./routes/protected-admin/TestFunctions";
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
  deleteUserSportAction,
  editAthleteProfileAction,
  editPersonQuestionAction,
  editSportAction,
  editTrainerProfileAction,
  editTrainerRatingAction,
  editUserProfileAction,
  loginAction,
  logOutAction,
  personQuestionWeighingCreateAction,
  personQuestionWeighingEditAction,
  registrationAction,
  testCreateAthleteProfilesAction,
  testCreateTrainerProfilesAction,
  trainerAthleteConnectionAction,
  trainerProfileCreateAction,
  trainerRatingCreateAction,
  userAthleteConnectionAction,
  userSportCreateAction,
  userTrainerConnectionAction,
} from "./utilities/actions";

import {
  appliedAthletesLoader,
  athletePartnersLoader,
  athleteProfileLoader,
  athletesToBePartnerLoader,
  athleteTrainersLoader,
  personQuestionLoader,
  personQuestionsLoader,
  personQuestionsWeighingLoader,
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
      { path: "home", element: <Home /> },
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
                children: [
                  {
                    path: "person-question-weighings",
                    element: <PersonQuestionWeighing />,
                    action: personQuestionWeighingCreateAction,
                    loader: personQuestionsWeighingLoader,
                  },
                  {
                    path: "person-question-weighings/edit",
                    action: personQuestionWeighingEditAction,
                  },
                ],
              },
              {
                path: "athlete-partners",
                element: <AthletePartners />,
                loader: athletePartnersLoader,
              },
              {
                path: "athletes-to-be-partner",
                element: <AthletesToBePartner />,
                action: userAthleteConnectionAction,
                loader: athletesToBePartnerLoader,
              },
              {
                path: "athlete-trainers",
                element: <AthleteTrainers />,
                action: trainerRatingCreateAction,
                loader: athleteTrainersLoader,
                children: [
                  {
                    path: "trainer-rating/update",
                    action: editTrainerRatingAction,
                  },
                ],
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
              {
                path: "applied-athletes",
                element: <AppliedAthletes />,
                action: trainerAthleteConnectionAction,
                loader: appliedAthletesLoader,
              },
            ],
          },
          {
            path: "user-profile",
            element: <UserProfileEdit />,
            action: editUserProfileAction,
          },
          { path: "user-sport/create", action: userSportCreateAction },
          { path: "user-sport/delete", action: deleteUserSportAction },
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
              {
                path: "test-functions",
                element: <TestFunctions />,
                children: [
                  {
                    path: "create-athlete-profiles",
                    action: testCreateAthleteProfilesAction,
                  },
                  {
                    path: "create-trainer-profiles",
                    action: testCreateTrainerProfilesAction,
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
