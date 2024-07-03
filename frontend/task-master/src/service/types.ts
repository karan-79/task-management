export type CreateAccountRequest = {
  name: string;
  username: string;
  password: string;
  email: string | null;
};

export type LoginRequest = Pick<CreateAccountRequest, "username" | "password">;

export type LoggedIn = {
  loggedIn: boolean;
};
