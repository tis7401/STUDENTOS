
import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Courses", path: "/courses" },
    { name: "Grades & GPA", path: "/grades" },
    { name: "Attendance", path: "/attendance" },
    { name: "Assignments", path: "/tasks" },
    { name: "AI Quiz", path: "/quiz" },
    { name: "Study Planner", path: "/planner" },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">STUDENTOS</h2>
        <p className="sidebar-label">MENU</p>

        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p>Academic Management</p>
          <small>Your learning, organized.</small>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
