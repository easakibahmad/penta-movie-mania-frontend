import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import NavDrawer from "../shared/nav_components/NavDrawer";

const MovieLayout = () => {
  return (
    <div>
      <div className="lg:hidden md:block">
        <NavDrawer></NavDrawer>
      </div>
      <div className="hidden lg:block">
        <Navbar></Navbar>
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default MovieLayout;
