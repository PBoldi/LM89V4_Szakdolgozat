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
    Boolean(user?.athleteprofile || user?.trainerprofile) ? (
      <Outlet context={{ user }} />
    ) : (
      <Fragment>
        <Outlet context={{ user }} />
        {!pathname?.includes("/profile-choose") ? (
          <Navigate replace to={"/profile-choose/athlete-profile"} />
        ) : null}
      </Fragment>
    )
  ) : (
    <Navigate replace to={"/authentication/login"} />
  );
}
