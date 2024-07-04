import Typography from "@/components/Typography";
import { projectsOverview } from "@/service/data.ts";
import ProjectCard from "@/features/Home/ProjectCard.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import CreateProject from "@/features/Home/CreateProject";
import { useEffect, useState } from "react";
import { useLoggedInUser } from "@/store/userStore.ts";
import { Identity } from "@/utils.ts";
import { getUserData } from "@/service/userService.ts";

const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { user, setUser } = useLoggedInUser(Identity);

  const handleCardClick = (id: string) => () => {
    navigate("/projects/" + id);
  };

  useEffect(() => {
    getUserData().then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading....</p>;

  return (
    <>
      <div className="p-16 flex flex-col gap-6">
        <div className="flex">
          <Typography variant="h2" className="border-b">
            Your work
          </Typography>
          <Button className="ml-auto min-w-52" onClick={() => setOpen(true)}>
            Create project
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projectsOverview.map((p) => (
            <ProjectCard
              onClick={handleCardClick(p.id)}
              project={p}
              key={p.id}
            />
          ))}
        </div>
      </div>
      <CreateProject
        open={open}
        onClose={() => {
          console.log("Close");
          setOpen(false);
        }}
      />
    </>
  );
};

export default Home;
