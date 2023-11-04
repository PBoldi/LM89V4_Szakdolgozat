import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const baseURL = "http://localhost:8000";
const timeoutMs = 30000;

const protectedInstance = axios.create({ baseURL, timeout: timeoutMs });
const unprotectedInstance = axios.create({ baseURL, timeout: timeoutMs });

protectedInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken
      ? {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : config;
  },
  (error) => Promise.reject(error)
);

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${baseURL}/auth/token/refresh/`, {
      refresh: localStorage.getItem("refreshToken"),
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("accessToken", tokenRefreshResponse.data.access);
      localStorage.setItem("refreshToken", tokenRefreshResponse.data.refresh);
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${tokenRefreshResponse.data.access}`;
      return Promise.resolve();
    })
    .catch((tokenRefreshError) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(tokenRefreshError);
    });

createAuthRefreshInterceptor(protectedInstance, refreshAuthLogic);

export const athleteProfileCreate = (data) =>
  protectedInstance.post("/auth/athlete-profile/", data);

export const createPersonQuestion = (data) =>
  protectedInstance.post("/auth/person-questions/", data);

export const createPersonQuestionWeighing = (data) =>
  protectedInstance.post("/auth/person-question-weighing/", data);

export const createSport = (data) =>
  protectedInstance.post("/auth/sports/", data);

export const deletePersonQuestion = (id) =>
  protectedInstance.delete(`/auth/person-questions/${id}`);

export const deleteSport = (id) =>
  protectedInstance.delete(`/auth/sports/${id}`);

export const deleteUserSport = (id) =>
  protectedInstance.delete(`/auth/user-sports/${id}`);

export const editAthleteProfile = (data, id) =>
  protectedInstance.put(`/auth/athlete-profile/${id}`, data);

export const editPersonQuestion = (data, id) =>
  protectedInstance.put(`/auth/person-questions/${id}`, data);

export const editPersonQuestionWeighing = (data, id) =>
  protectedInstance.put(`/auth/person-question-weighing/${id}`, data);

export const editSport = (data, id) =>
  protectedInstance.put(`/auth/sports/${id}`, data);

export const editTrainerProfile = (data, id) =>
  protectedInstance.put(`/auth/trainer-profile/${id}`, data);

export const editUserProfile = (data, id) =>
  protectedInstance.patch(`/auth/users/${id}`, data);

export const getAppliedAthletes = () =>
  protectedInstance.get(`/auth/applied-athletes/`);

export const getAthlete = (id) =>
  protectedInstance.get(`/auth/athlete-profile/${id}`);

export const getAthletes = () => protectedInstance.get("/auth/athlete-profile");

export const getAthletePartners = () =>
  protectedInstance.get("/auth/athlete-partners");

export const getAthletesToBePartner = () =>
  protectedInstance.get("/auth/athlete-to-be-partner");

export const getAthleteTrainers = () =>
  protectedInstance.get("/auth/athlete-trainers");

export const getPersonQuestion = (id) =>
  protectedInstance.get(`/auth/person-questions/${id}`);

export const getPersonQuestions = () =>
  protectedInstance.get("/auth/person-questions/");

export const getPersonQuestionWeighings = () =>
  protectedInstance.get("/auth/person-question-weighing/");

export const getSport = (id) => protectedInstance.get(`/auth/sports/${id}`);

export const getSports = () => protectedInstance.get("/auth/sports/");

export const getTrainer = (id) =>
  protectedInstance.get(`/auth/trainer-profile/${id}`);

export const getTrainers = () => protectedInstance.get("/auth/trainer-profile");

export const getUserByAccessToken = () =>
  protectedInstance.get("/auth/users/authenticated/");

export const getUserSports = () => protectedInstance.get("/auth/user-sports/");

export const login = (data) => unprotectedInstance.post("/auth/token/", data);

export const registration = (data) =>
  unprotectedInstance.post("/auth/users/", data);

export const testCreateAthleteProfiles = () =>
  protectedInstance.post("/auth/create-test-athlete-profile/");

export const testCreateTrainerProfiles = () =>
  protectedInstance.post("/auth/create-test-trainer-profile/");

export const trainerAthleteConnection = (data) =>
  protectedInstance.post(`/auth/trainer-athlete-connection/`, data);

export const trainerProfileCreate = (data) =>
  protectedInstance.post("/auth/trainer-profile/", data);

export const userAthleteConnection = (data) =>
  protectedInstance.post(`/auth/user-athlete-connection/`, data);

export const userSportCreate = (data) =>
  protectedInstance.post("/auth/user-sports/", data);

export const userTrainerConnection = (data) =>
  protectedInstance.post(`/auth/user-trainer-connection/`, data);
