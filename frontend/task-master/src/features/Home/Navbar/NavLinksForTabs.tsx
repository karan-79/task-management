import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";

const NavLinksForTabs = () => {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        to="/home"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Link
        to="/home/projects"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Projects
      </Link>
      <Link
        to="/home/boards"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Boards
      </Link>
    </nav>
  );
};

export default NavLinksForTabs;
