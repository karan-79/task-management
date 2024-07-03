import { lazy, useEffect } from "react";
import {
  BrowserRouter,
  Navigate as Redirect,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useLoggedInUser } from "@/store/userStore.ts";
import { verifyLogin } from "@/service/userService.ts";
import { LoggedIn } from "@/service/types.ts";
import { WithLoggedInUser } from "@/Router/withLoggedInUser.tsx";

const Navigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home/your-work");
  }, []);

  return null;
};

const YourWork = lazy(() => import("../features/Home"));
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate />} />
        <Route path="/home" element={WithLoggedInUser(<Layout />)}>
          <Route index path="" element={WithLoggedInUser(<YourWork />)} />
          {childRoutes.map((r) => {
            return (
              <Route
                path={"/home" + r.path}
                element={WithLoggedInUser(r.component)}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
