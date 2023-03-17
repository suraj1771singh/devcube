import "./App.css";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";
import CreateRoom from "./components/CreateRoom";
import ProfilePage from "./components/ProfilePage";
import RoomPage from "./components/RoomPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/create-room" element={<CreateRoom />}></Route>
          <Route exact path="/room-update/:id" element={<CreateRoom />}></Route>
        </Route>
        <Route exact path="/user/:id" element={<ProfilePage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/room/:id" element={<RoomPage />}></Route>

        <Route exact path="/register" element={<RegistrationPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
