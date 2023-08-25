import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import { useSelector } from "react-redux";
import Settings from "./Components/Settings";


function App() {
  const authGuard = Boolean(useSelector((state) => state.token));
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={authGuard ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={authGuard ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/settings/:userId"
            element={authGuard ? <Settings /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
