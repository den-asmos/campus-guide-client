import { cn } from "@/lib/utils";
import { Calendar, Home, Map, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-background sticky bottom-0 z-20 flex h-13 w-full items-center justify-around px-4">
      <NavLink
        to="/"
        className={({ isActive }) => cn(isActive && "text-button-primary")}
      >
        <Home />
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) => cn(isActive && "text-button-primary")}
      >
        <Map />
      </NavLink>

      <NavLink
        to="/timetable/filter"
        className={({ isActive }) => cn(isActive && "text-button-primary")}
      >
        <Calendar />
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) => cn(isActive && "text-button-primary")}
      >
        <Search />
      </NavLink>
    </nav>
  );
};

export default Navbar;
