import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Timetable from "./pages/Timetable";
import Lesson from "./pages/Lesson";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/timetable" element={<Timetable />} />
				<Route path="/lesson" element={<Lesson />} />
				<Route path="/map" element={<Map />} />
				<Route path="/search" element={<Search />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
