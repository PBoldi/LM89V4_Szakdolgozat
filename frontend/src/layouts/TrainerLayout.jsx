import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function TrainerLayout() {
  const { user } = useOutletContext();

  return user?.trainerprofile ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate replace to={"/home"} />
  );
}
