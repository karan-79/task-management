import { RHFormField } from "@/components/Input";
import { Button } from "@/components/Button";
import { CreateAccountRequest } from "@/service/types.ts";
import { UseControllerProps, useForm } from "react-hook-form";
import { authenticate, createUser } from "@/service/userService.ts";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "@/store/userStore.ts";
import { Identity } from "@/utils.ts";

const SignUpForm = () => {
  const { handleSubmit, control, formState } = useForm<CreateAccountRequest>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { setToken } = useLoggedInUser(Identity);
  const onValidForm = (data: CreateAccountRequest) => {
    createUser(data).then(() =>
      authenticate({ username: data.username, password: data.password }).then(
        (token: string) => {
          setToken(token);
        },
      ),
    );
  };

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
        <div className="grid gap-2">
          <RHFormField
            label="Name"
            controllerProps={
              {
                control,
                name: "name",
                rules: {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                },
              } as UseControllerProps<CreateAccountRequest>
            }
            inputProps={{
              placeholder: "Your name",
              type: "text",
            }}
          />
        </div>
        <div className="grid gap-2">
          <RHFormField
            label="E-mail"
            controllerProps={
              {
                control,
                name: "email",
                rules: {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                },
              } as UseControllerProps<CreateAccountRequest>
            }
            inputProps={{
              placeholder: "Enter password at least 8 character long",
              type: "email",
            }}
          />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </div>
    </form>
  );
};
export default SignUpForm;
