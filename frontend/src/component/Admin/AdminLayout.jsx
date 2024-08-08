import { Outlet, Link } from "react-router-dom";
import "../../style/adminlayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <button className="go_back">
        {" "}
        <Link to="/">Go Back</Link>{" "}
      </button>
      <div className="sidebar">
        <h1 className="admin">Admin</h1>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>
          <li>
            <Link to="/admin/event">Events</Link>
          </li>
        </ul>
      </div>
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    </div>
  );
};

export default AdminLayout;
