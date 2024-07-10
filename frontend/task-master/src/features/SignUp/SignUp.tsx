import Typography from "@/components/Typography";
import { Link } from "react-router-dom";
import SignUpCover from "@/features/SignUp/SignUpCover.tsx";
import SignUpForm from "@/features/SignUp/SignUpForm.tsx";

const SignUp = () => {
  return (
    <div className="w-full lg:grid lg:min-h-dvh lg:grid-cols-2 xl:min-h-dvh">
      <SignUpCover />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Typography variant="h1">Sign up</Typography>
          </div>
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            <Typography variant="p">
              Already have an account?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
