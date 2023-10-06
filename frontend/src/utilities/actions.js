import { redirect } from "react-router-dom";

import {
  athleteProfileCreate,
  createPersonQuestion,
  createPersonQuestionWeighing,
  createSport,
  deletePersonQuestion,
  deleteSport,
  deleteUserSport,
  editAthleteProfile,
  editPersonQuestion,
  editPersonQuestionWeighing,
  editSport,
  editTrainerProfile,
  editUserProfile,
  login,
  registration,
  trainerProfileCreate,
  userAthleteConnection,
  userSportCreate,
  userTrainerConnection,
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

export async function deleteSportAction({ params }) {
  try {
    await deleteSport(params?.id);
    return redirect("/admin/sports");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function deleteUserSportAction({ request }) {
  try {
    const formData = await request.formData();

    await deleteUserSport(formData.get("id"));
    return redirect(formData.get("pathname"));
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function editAthleteProfileAction({ params, request }) {
  try {
    const formData = await request.formData();

    await editAthleteProfile(formData, params?.id);
    return redirect("/");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function editPersonQuestionAction({ params, request }) {
  try {
    const formData = await request.formData();

    await editPersonQuestion(formData, params?.id);
    return redirect("/admin/person-questions");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function editSportAction({ params, request }) {
  try {
    const formData = await request.formData();

    await editSport(formData, params?.id);
    return redirect("/admin/sports");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function editTrainerProfileAction({ params, request }) {
  try {
    const formData = await request.formData();

    await editTrainerProfile(formData, params?.id);
    return redirect("/");
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
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return redirect("/");
}

export async function personQuestionWeighingCreateAction({ request }) {
  try {
    const formData = await request.formData();

    await createPersonQuestionWeighing(formData);

    return redirect(formData.get("pathname"));
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400)
      return error?.response?.data;
    throw error;
  }
}

export async function personQuestionWeighingEditAction({ request }) {
  try {
    const formData = await request.formData();

    await editPersonQuestionWeighing(formData, formData.get("person_question"));

    return redirect(formData.get("pathname"));
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400)
      return error?.response?.data;
    throw error;
  }
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

export async function editUserProfileAction({ request }) {
  try {
    const formData = await request.formData();

    await editUserProfile(formData, formData.get("id"));
    return redirect("/user-profile");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function userAthleteConnectionAction({ request }) {
  try {
    const formData = await request.formData();

    await userAthleteConnection(formData);
    return redirect("/athlete/search-athlete");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function userSportCreateAction({ request }) {
  try {
    const formData = await request.formData();

    await userSportCreate(formData);
    return redirect(formData.get("pathname"));
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}

export async function userTrainerConnectionAction({ request }) {
  try {
    const formData = await request.formData();

    await userTrainerConnection(formData);
    return redirect("/athlete/search-trainer");
  } catch (error) {
    if (error?.response?.data && error?.response?.status === 400) {
      console.log(error);
      return error?.response?.data;
    }
    throw error;
  }
}
