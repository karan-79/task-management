import coverImage from "@/assets/pexels-adrien-olichon-1257089-2387793.jpg";
import Typography from "@/components/Typography";

const SignUpCover = () => {
  return (
    <div className="bg-muted lg:block">
      <div className="relative h-screen">
        <img
          src={coverImage as string}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Typography variant="h1">Welcome to TaskMaster</Typography>
            <Typography variant="p">
              Sign up to start managing your tasks efficiently.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCover;
