import { FC, Suspense } from "react";

export const WithLoggedInUser: FC = (Component: FC) => {
  return (
    <Suspense fallback="...Loading">
      <Component />
    </Suspense>
  );
};
