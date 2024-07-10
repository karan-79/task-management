import Typography from "@/components/Typography";

const EmptyProject = () => {
  return (
    <div className="flex justify-center flex-grow">
      <Typography variant="h5" className="text-muted-foreground">
        No projects found
      </Typography>
    </div>
  );
};

export default EmptyProject;
