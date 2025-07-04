import "./types/telegram";
import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/navigation-bar";
import MainScreen from "./components/main-screen";
import ProfileScreen from "./components/profile-screen";
import HistoryScreen from "./components/history-screen";

const TelegramApp: React.FC = () => {
  return (
    <div className="h-dvh flex flex-col gap-0">
      <div className="relative overflow-hidden flex-1">
        <Routes>
          <Route path="/" element={<MainScreen />} index />

          {/* Scooter Drawer */}
          <Route path="/start" element={<MainScreen />} />
          <Route path="/eco" element={<MainScreen />} />
          <Route path="/wallet" element={<MainScreen />} />
          <Route path="/payment" element={<MainScreen />} />
          <Route path="/active-ride" element={<MainScreen />} />

          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <NavigationBar />
    </div>
  );
};

export default TelegramApp;
