import { RHFormField } from "@/components/Input";
import { UseControllerProps, useForm } from "react-hook-form";
import { CreateAccountRequest, LoginRequest } from "@/service/types.ts";
import { authenticate } from "@/service/userService.ts";
import { useLoggedInUser, User } from "@/store/userStore.ts";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Typography from "@/components/Typography";
import {
  FetchMachineState,
  isFailed,
  isLoading,
} from "@/types/fetchMachine.ts";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Identity } from "@/utils.ts";

const LoginForm = () => {
  const { handleSubmit, control, formState } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [state, setState] = useState<FetchMachineState<User>>({
    __tag: "IDLE",
  });

  const { token, setToken, setUser } = useLoggedInUser(Identity);
  const navigate = useNavigate();

  const onValidForm = (data: LoginRequest) => {
    setState({ __tag: "LOADING" });
    authenticate(data)
      .then((t) => {
        localStorage.setItem("jwt", t);
        setToken(t);
      })
      .catch((e) => setState({ __tag: "FAILED", error: e }));
  };

  useEffect(() => {
    if (!token) return;
    navigate("/home");
  }, [token]);

  return (
    <form onSubmit={handleSubmit(onValidForm, console.log)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <RHFormField
            label="Username"
            controllerProps={
              {
                control: control,
                name: "username",
                rules: {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Username should have at least 5 characters",
                  },
                },
              } as UseControllerProps<CreateAccountRequest>
            }
            inputProps={{ placeholder: "Your username" }}
          />
        </div>
        <div className="grid gap-2">
          <RHFormField
            label="Password"
            controllerProps={
              {
                control,
                name: "password",
                rules: {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should have at least 8 characters",
                  },
                },
              } as UseControllerProps<CreateAccountRequest>
            }
            inputProps={{
              placeholder: "Enter password atleast 8 character long",
              type: "password",
            }}
          />
        </div>
        <Button disabled={isLoading(state)}>
          {isLoading(state) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
        </Button>
        {isFailed(state) && (
          <Typography variant="h5" className="text-destructive">
            Failed to log you in
          </Typography>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
