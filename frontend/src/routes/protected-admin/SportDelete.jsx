import { useLoaderData } from "react-router-dom";
import SportDialog from "../../components/SportDialog";

export default function SportDelete() {
  const sport = useLoaderData();

  return <SportDialog sport={sport} />;
}
