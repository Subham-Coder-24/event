import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import "./App.css";
import Register from "./component/Register";
import { useEffect, useState } from "react";
import Events from "./component/Events";
import EventDetails from "./component/EventDetails";
import Booking from "./component/Booking";
import Dashboard from "./component/Admin/Dashboard";
import AdminEvent from "./component/Admin/AdminEvent";
import AdminCategories from "./component/Admin/AdminCategories";
import AdminLayout from "./component/Admin/AdminLayout";
import Layout from "./component/Layout";
import Profile from "./component/Profile";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route
            path="/booking"
            element={user ? <Booking /> : <Login setUser={setUser} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={user ? <Home /> : <Login setUser={setUser} />}
          />
        </Route>

        {/* Admin routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="event" element={<AdminEvent />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
