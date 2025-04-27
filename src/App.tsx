import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import JoinUsers from "./pages/JoinUsers";
import Quiz from "./pages/Quiz";

import { AnimatePresence } from "framer-motion";
import { SocketProvider } from "./SocketContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <SocketProvider>
          <LocationProvider>
            <RoutesWithAnimations />
          </LocationProvider>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

function RoutesWithAnimations() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<Home />} />
      <Route path="/creation" element={<Creation />} />
      <Route path="/join" element={<JoinUsers />} />
      <Route path="/quiz" element={<Quiz />} />
      {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
    </Routes>
  );
}

function LocationProvider({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

export default App;
