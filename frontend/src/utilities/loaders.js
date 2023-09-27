import {
  getAthletes,
  getSports,
  getTrainers,
  getUserByAccessToken,
} from "./api";

export async function rootLayoutLoader() {
  try {
    const response = await getUserByAccessToken();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchAthletesLoader() {
  try {
    const response = await getAthletes();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchTrainersLoader() {
  try {
    const response = await getTrainers();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function sportsLoader() {
  try {
    const response = await getSports();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
