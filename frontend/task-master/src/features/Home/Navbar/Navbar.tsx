import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/Sheet";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import UserProfileActions from "./UserProfileActions";
import ThemeSwitcher from "./ThemeSwitcher";
import NavLinksForTabs from "./NavLinksForTabs";
import NavLinksForTabsLg from "./NavLinksForTabsLg";

const Navbar = () => {
  const navigate = useNavigate();
  const handleChange = (path: string) => () => {
    navigate(path);
  };

  return (
    <header className="sticky bg-muted top-0 flex h-16 items-center gap-4 border-b p-4 px-4 md:px-6">
      <NavLinksForTabsLg />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavLinksForTabs />
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <UserProfileActions />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Navbar;
