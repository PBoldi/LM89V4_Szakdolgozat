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

export const login = (data) => unprotectedInstance.post("/auth/token/", data);

export const registration = (data) =>
  unprotectedInstance.post("/auth/users/", data);

export const getUserByAccessToken = () =>
  protectedInstance.get("/auth/users/authenticated/");
