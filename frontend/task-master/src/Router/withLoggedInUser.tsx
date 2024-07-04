import { FC, Suspense } from "react";
import { useLoggedInUser } from "@/store/userStore.ts";
import { Navigate } from "react-router-dom";

export const WithLoggedInUser: FC = (Component: FC) => {
  const token = useLoggedInUser((s) => s.token);

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback="...Loading">
      <Component />
    </Suspense>
  );
};
