import {
  getAthletes,
  getPersonQuestion,
  getPersonQuestions,
  getSports,
  getTrainers,
  getUserByAccessToken,
} from "./api";

export async function personQuestionLoader({ params }) {
  try {
    const response = await getPersonQuestion(params?.id);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function personQuestionsLoader() {
  try {
    const response = await getPersonQuestions();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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
