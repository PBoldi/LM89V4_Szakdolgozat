import { useLoaderData } from "react-router-dom";
import SportDialog from "../../components/SportDialog";

export default function SportEdit() {
  const sport = useLoaderData();

  return <SportDialog sport={sport} />;
}
