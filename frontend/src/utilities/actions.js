import { redirect } from "react-router-dom";

import {
  athleteProfileCreate,
  createPersonQuestion,
  createSport,
  deletePersonQuestion,
  login,
  registration,
  trainerProfileCreate,
} from "./api";

export async function athleteProfileCreateAction({ request }) {
  try {
    const formData = await request.formData();
    await athleteProfileCreate(formData);
    return redirect("/");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function createPersonQuestionAction({ request }) {
  try {
    const formData = await request.formData();
    await createPersonQuestion(formData);
    return redirect("/admin/person-questions");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function createSportAction({ request }) {
  try {
    const formData = await request.formData();
    await createSport(formData);
    return redirect("/admin/sports");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function deletePersonQuestionAction({ params }) {
  try {
    await deletePersonQuestion(params?.id);
    return redirect("/admin/person-questions");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();

    const response = await login(Object.fromEntries(formData));
    localStorage.setItem("accessToken", response?.data?.access);
    localStorage.setItem("refreshToken", response?.data?.refresh);
    return redirect("/");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 401)
      return error?.response?.data;
    throw error;
  }
}

export function logOutAction() {
  console.log("ad");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return redirect("/");
}

export async function registrationAction({ request }) {
  try {
    const formData = await request.formData();
    await registration(Object.fromEntries(formData));
    return redirect("/authentication/login");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400)
      return error?.response?.data;
    throw error;
  }
}

export async function trainerProfileCreateAction({ request }) {
  try {
    const formData = await request.formData();
    await trainerProfileCreate(formData);
    return redirect("/");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}
