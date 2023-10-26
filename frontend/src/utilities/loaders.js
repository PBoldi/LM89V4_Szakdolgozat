import {
  getAppliedAthletes,
  getAthlete,
  getAthletes,
  getPersonQuestion,
  getPersonQuestions,
  getPersonQuestionWeighings,
  getSport,
  getSports,
  getTrainer,
  getTrainers,
  getUserByAccessToken,
  getUserSports,
} from "./api";

export async function appliedAthletesLoader() {
  try {
    const response = await getAppliedAthletes();
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function athleteProfileLoader({ params }) {
  try {
    const [promiseAthlete, promiseSports, promiseUserSports] =
      await Promise.all([getAthlete(params?.id), getSports(), getUserSports()]);
    return {
      athleteProfile: promiseAthlete?.data,
      sports: promiseSports?.data,
      userSports: promiseUserSports?.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function personQuestionLoader({ params }) {
  try {
    const response = await getPersonQuestion(params?.id);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function personQuestionsWeighingLoader() {
  try {
    const [promisePersonQuestions, promisePersonQuestionWeighings] =
      await Promise.all([getPersonQuestions(), getPersonQuestionWeighings()]);
    return {
      personQuestions: promisePersonQuestions?.data,
      personQuestionWeighings: promisePersonQuestionWeighings?.data,
    };
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

export async function sportLoader({ params }) {
  try {
    const response = await getSport(params?.id);
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

export async function trainerProfileLoader({ params }) {
  try {
    const [promiseTrainerProfile, promiseSports, promiseUserSports] =
      await Promise.all([getTrainer(params?.id), getSports(), getUserSports()]);
    return {
      trainerProfile: promiseTrainerProfile?.data,
      sports: promiseSports?.data,
      userSports: promiseUserSports?.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
