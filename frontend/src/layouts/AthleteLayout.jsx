import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function AthleteLayout() {
  const { user } = useOutletContext();

  return user?.athlete_profile ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate replace to={"/"} />
  );
}
