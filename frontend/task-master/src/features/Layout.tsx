import Navbar from "@/features/Home/Navbar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return <>
        <header>
            <Navbar/>
        </header>
        <main>
            <Outlet/>
        </main>
    </>
}

export default Layout