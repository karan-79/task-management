import Navbar from "@/features/Home/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
