import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";

const NavLinksForTabsLg = () => {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        to="/home"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
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

export default NavLinksForTabsLg;
