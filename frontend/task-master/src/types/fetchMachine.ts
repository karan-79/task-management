type Idle = {
  __tag: "IDLE";
};

type Loading = {
  __tag: "LOADING";
};

type Success<T> = {
  __tag: "SUCCESS";
  data: T | null;
};

type Completed<T> = {
  __tag: "COMPLETED";
  data?: T;
};

type Failed = {
  __tag: "FAILED";
  error: Error;
};

export type FetchMachineState<T> =
  | Idle
  | Loading
  | Success<T>
  | Completed<T>
  | Failed;

export const isLoading = <T>(state: FetchMachineState<T>): state is Loading =>
  state.__tag === "LOADING";

export const isCompleted = <T>(
  state: FetchMachineState<T>,
): state is Completed<T> => state.__tag === "COMPLETED";

export const isSuccess = <T>(
  state: FetchMachineState<T>,
): state is Success<T> => state.__tag === "COMPLETED";

export const isFailed = <T>(state: FetchMachineState<T>): state is Failed =>
  state.__tag === "FAILED";
