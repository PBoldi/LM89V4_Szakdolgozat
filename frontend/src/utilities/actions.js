import { redirect } from "react-router-dom";

import { login } from "./api";

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();

    const response = await login(Object.fromEntries(formData));
    localStorage.setItem("accessToken", response?.data?.access);
    localStorage.setItem("refreshToken", response?.data?.refresh);
    console.log(response);
    return redirect("/");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 401)
      return error?.response?.data;
    throw error;
  }
}
