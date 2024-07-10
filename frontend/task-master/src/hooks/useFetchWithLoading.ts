import { useEffect, useRef, useState } from "react";

type Args<T> = {
  fetchFn: () => Promise<T>;
  initialState?: T;
};
export const useFetchWithLoading = <T>({ fetchFn, initialState }: Args<T>) => {
  const [state, setState] = useState({
    data: initialState,
    error: undefined,
    isLoading: false,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    fetchFn()
      .then((data) => setState((prevState) => ({ ...prevState, data })))
      .catch((e) => setState((prevState) => ({ ...prevState, error: e })))
      .finally(() =>
        setState((prevState) => ({ ...prevState, isLoading: false })),
      );
  }, [refresh]);

  return {
    ...state,
    setData: (prev: T) =>
      setState((prevState) => ({ ...prevState, data: prev })),
    refresh: () => {
      setRefresh((prev) => !prev);
    },
  };
};
