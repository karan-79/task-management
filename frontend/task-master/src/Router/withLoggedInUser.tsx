import { FC, Suspense, useEffect, useState } from "react";
import { useLoggedInUser } from "@/store/userStore.ts";
import { verifyLogin } from "@/service/userService.ts";
import { LoggedIn } from "@/service/types.ts";
import { Navigate } from "react-router-dom";
import {
  FetchMachineState,
  isCompleted,
  isLoading,
  isSuccess,
} from "@/types/fetchMachine.ts";

export const WithLoggedInUser: FC = (Component: FC) => {
  const s = useLoggedInUser((s) => s);
  const user = s.user;
  const setUser = s.setUser;
  const [state, setState] = useState<FetchMachineState<LoggedIn>>({
    __tag: "IDLE",
  });

  console.log(s, state);
  useEffect(() => {
    console.log("useee");
    setState({ __tag: "LOADING" });

    verifyLogin()
      .then((data: LoggedIn) => {
        if (!data.loggedIn) {
          setState({ __tag: "SUCCESS", data: null });
        }
      })
      .catch(() => {
        setState({ __tag: "COMPLETED" });
      });
  }, []);

  useEffect(() => {
    if (state.__tag === "IDLE") return;

    if (isSuccess(state)) {
      setUser(state.data);
    }
  }, [state]);
  if (isLoading(state) || !isCompleted(state)) return <>Loading</>;

  if (isCompleted(state) && user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback="...Loading">
      <Component />
    </Suspense>
  );
};
