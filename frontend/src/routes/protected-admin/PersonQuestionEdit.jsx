import { useLoaderData } from "react-router-dom";
import PersonQuestionDialog from "../../components/PersonQuestionDialog";

export default function PersonQuestionEdit() {
  const personQuestion = useLoaderData();

  return <PersonQuestionDialog personQuestion={personQuestion} />;
}
