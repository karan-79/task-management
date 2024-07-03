import Typography from "@/components/Typography";
import SignUpForm from "@/features/SignUp/SignUpForm.tsx";
import { Link } from "react-router-dom";
import LoginCover from "@/features/Login/LoginCover.tsx";
import LoginForm from "@/features/Login/LoginForm.tsx";

const Login = () => {
  return (
    <div className="w-full lg:grid lg:min-h-dvh lg:grid-cols-2 xl:min-h-dvh">
      <LoginCover />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Typography variant="h1">Login</Typography>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            <Typography variant="p">
              Don't have an account?{" "}
              <Link className="underline" to="/signup">
                Sign up
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
