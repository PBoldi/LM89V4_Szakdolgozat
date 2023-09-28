import { useLoaderData } from "react-router-dom";
import PersonQuestionDialog from "../../components/PersonQuestionDialog";

export default function PersonQuestionDelete() {
  const personQuestion = useLoaderData();

  return <PersonQuestionDialog personQuestion={personQuestion} />;
}
