import { cn } from "@/lib/utils";
import { Calendar, Home, Map, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="px-4 h-13 sticky bottom-0 z-20 flex items-center w-full justify-around bg-background">
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
				to="/timetable"
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
