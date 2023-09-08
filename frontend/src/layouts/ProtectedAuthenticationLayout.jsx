import { Fragment } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";

export default function ProtectedAuthenticationLayout() {
  const { pathname } = useLocation();
  const { user } = useOutletContext();

  return user?.id ? (
    Boolean(user?.athlete_profile || user?.trainer_profile) ? (
      <Outlet context={{ user }} />
    ) : (
      <Fragment>
        <Outlet context={{ user }} />
        {!pathname?.includes("/profile-choose") ? (
          <Navigate replace to={"/profile-choose"} />
        ) : null}
      </Fragment>
    )
  ) : (
    <Navigate replace to={"/authentication/login"} />
  );
}
