import { lazy, useEffect } from "react";
import {
  Navigate as Redirect,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLoggedInUser } from "@/store/userStore.ts";

const Navigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("any route");
    navigate("/home");
  }, []);

  return null;
};

const YourWork = lazy(() => import("../features/Home/ProjectOverview.tsx"));
const Layout = lazy(() => import("../features/Layout"));
const ProjectOverview = lazy(() => import("../features/Project"));
const SignUp = lazy(() => import("../features/SignUp"));
const Login = lazy(() => import("../features/Login"));

const childRoutes = [
  {
    path: "/projects/:projectId",
    component: <ProjectOverview />,
  },
];

// TODO fix these routes

// TODO redo the redirect using HOC encapsulating each route
const Router = () => {
  const user = useLoggedInUser((state) => state.user);
  const { pathname } = useLocation();
  console.log("user", user);
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate />} />
        <Route path="/home" element={<Layout />}>
          <Route index path="" element={<YourWork />} />
          {childRoutes.map((r) => {
            return <Route path={"/home" + r.path} element={r.component} />;
          })}
        </Route>
      </Routes>
      {user === null && !pathname.includes("/signup") && (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Router;
