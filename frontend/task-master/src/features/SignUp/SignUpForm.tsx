import { Label } from "@/components/Label";
import { RHFormField } from "@/components/Input";
import { Button } from "@/components/Button";
import { CreateAccountRequest, LoggedIn } from "@/service/types.ts";
import { UseControllerProps, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { TextField } from "@/components/TextField";
import { authenticate, createUser } from "@/service/userService.ts";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [form, setForm] = useState<CreateAccountRequest>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleFieldChange =
    (field: keyof CreateAccountRequest) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.name }));
    };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <TextField
            label="Username"
            name="username"
            placeholder="Enter a username"
            onChange={handleFieldChange("username")}
          />
        </div>
        <div className="grid gap-2">
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password atleast 8 character long"
            onChange={handleFieldChange("password")}
          />
        </div>
        <div className="grid gap-2">
          <TextField
            label="Name"
            id="name"
            type="text"
            placeholder="Your name"
            onChange={handleFieldChange("name")}
          />
        </div>
        <div className="grid gap-2">
          <TextField
            label="Email"
            type="email"
            placeholder="test@cool.com"
            onChange={handleFieldChange("email")}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </>
  );
};

//TODO keeping it for now
const S = () => {
  const { handleSubmit, control, formState } = useForm<CreateAccountRequest>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onValidForm = (data: CreateAccountRequest) => {
    createUser(data).then(() =>
      authenticate({ username: data.username, password: data.password }).then(
        (data: LoggedIn) => {
          if (data.loggedIn) navigate("/home/your-work");
          if (!data.loggedIn) navigate("/login"); // TODO add a message state to be passed in case of failure
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
export default S;
