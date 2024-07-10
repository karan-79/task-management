import { Skeleton } from "@/components/Skeleton";

const ProjectLoadingSkeleton = () => {
  return new Array(4).fill(4).map((_, i) => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
};

export default ProjectLoadingSkeleton;
