import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function ProtectedAuthenticationLayout() {
  const { user } = useOutletContext();

  return user?.is_admin ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate replace to={"/home"} />
  );
}
