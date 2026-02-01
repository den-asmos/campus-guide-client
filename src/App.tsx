import { BrowserRouter, Route, Routes } from "react-router-dom";
import Direction from "./pages/Direction";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetCode from "./pages/PasswordResetCode";
import PasswordResetEmail from "./pages/PasswordResetEmail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Timetable from "./pages/Timetable";

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
				<Route path="/direction" element={<Direction />} />
				<Route path="/search" element={<Search />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/password-reset">
					<Route index element={<PasswordReset />} />
					<Route path="code" element={<PasswordResetCode />} />
					<Route path="email" element={<PasswordResetEmail />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
