import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "sonner";
import OfflineBanner from "./components/OfflineBanner";
import useOnlineStatus from "./hooks/useOnlineStatus";

const Direction = lazy(() => import("./pages/Direction"));
const Home = lazy(() => import("./pages/Home"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Map = lazy(() => import("./pages/Map"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const PasswordResetCode = lazy(() => import("./pages/PasswordResetCode"));
const PasswordResetEmail = lazy(() => import("./pages/PasswordResetEmail"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));
const Settings = lazy(() => import("./pages/Settings"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Timetable = lazy(() => import("./pages/Timetable"));
const TimetableFilter = lazy(() => import("./pages/TimetableFilter"));

const App = () => {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
    } else if (wasOffline.current) {
      toast.success("Подключение восстановлено");
      wasOffline.current = false;
    }
  }, [isOnline]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/timetable">
              <Route index element={<Timetable />} />
              <Route path="filter" element={<TimetableFilter />} />
            </Route>
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
        </Suspense>
      </BrowserRouter>
      {!isOnline && <OfflineBanner />}
    </>
  );
};

export default App;
