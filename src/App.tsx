import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
