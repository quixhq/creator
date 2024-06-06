import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import JoinUsers from "./pages/JoinUsers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creation" element={<Creation />} />
          <Route path="/join" element={<JoinUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
