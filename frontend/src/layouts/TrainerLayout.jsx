import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function TrainerLayout() {
  const { user } = useOutletContext();

  return user?.trainer_profile ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate replace to={"/"} />
  );
}
