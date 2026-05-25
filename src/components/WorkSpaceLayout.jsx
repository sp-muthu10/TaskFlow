import {
  useEffect,
  useState,
} from "react";

import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  Plus,
  Search,
  ClipboardList,
  CheckCircle2,
  CircleDashed,
  Clock3,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./WorkSpaceLayout.css";

function WorkspaceLayout() {

  const navigate =
    useNavigate();

  /* Sidebar */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  /* Tasks */

  const [tasks, setTasks] =
    useState([]);

  /* Search */

  const [searchTerm, setSearchTerm] =
    useState("");

  /* User */

  const [username, setUsername] =
    useState("User");

  const [role, setRole] =
    useState("Task Manager");

  const [email, setEmail] =
    useState("");

  /* Load */

  useEffect(() => {

    loadTasks();

    loadUser();

    window.addEventListener(
      "taskUpdated",
      loadTasks
    );

    return () => {

      window.removeEventListener(
        "taskUpdated",
        loadTasks
      );

    };

  }, []);

  /* Load Tasks */

  const loadTasks = () => {

    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);

  };

  /* Load User */

  const loadUser = () => {

    const storedUsername =
      localStorage.getItem(
        "username"
      );

    const storedRole =
      localStorage.getItem(
        "role"
      );

    const storedEmail =
      localStorage.getItem(
        "email"
      );

    if (storedUsername) {

      setUsername(
        storedUsername
      );

    }

    if (storedRole) {

      setRole(
        storedRole
      );

    }

    if (storedEmail) {

      setEmail(
        storedEmail
      );

    }

  };

  /* Logout */

  const logoutHandler = () => {

    localStorage.removeItem(
      "username"
    );

    localStorage.removeItem(
      "email"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");

  };

  /* Analytics */

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  /* Search */

  const filteredTasks =
    tasks.filter((task) =>

      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    );

  return (
    <div className="workspace-container">

      {/* Mobile Navbar */}

      <div className="mobile-navbar">

        <h1>
          TaskFlow
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        >

          <Menu size={30} />

        </button>

      </div>

      {/* Sidebar */}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "active"
            : ""
        }`}
      >

        {/* Top */}

        <div>

          <h1 className="logo">

            TaskFlow

          </h1>

          {/* Navigation */}

          <nav className="nav-links">

            <Link
              to="/dashboard"
              className="nav-item"
            >

              <LayoutDashboard size={22} />

              <span>
                Dashboard
              </span>

            </Link>
            <Link
              to="/search"
              className="nav-item"
            >

              <Search size={22} />

              <span>
                Search Tasks
              </span>

            </Link>

            <Link
              to="/task-list"
              className="nav-item"
            >

              <ClipboardList size={22} />

              <span>
                Task List
              </span>

            </Link>

            <Link
              to="/kanban"
              className="nav-item"
            >

              <CircleDashed size={22} />

              <span>
                Kanban
              </span>

            </Link>

            <Link
              to="/calendar"
              className="nav-item"
            >

              <CalendarDays size={22} />

              <span>
                Calendar
              </span>

            </Link>

            <Link
              to="/analytics"
              className="nav-item"
            >

              <BarChart3 size={22} />

              <span>
                Analytics
              </span>

            </Link>

            <Link
              to="/notifications"
              className="nav-item"
            >

              <Bell size={22} />

              <span>
                Notifications
              </span>

            </Link>



          </nav>

        </div>

        {/* Bottom */}

        <div>

          {/* User */}

          <div className="user-card">

            <h2>
              {username}
            </h2>

            <p>
              {email}
            </p>

            <p>
              {role}
            </p>

          </div>

          {/* Logout */}

          <button
            onClick={logoutHandler}
            className="logout-btn"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main */}

      <main className="main-content">

        {/* Top */}

        <div className="top-section">

          {/* Heading */}

          <div className="heading">

            <h1>

              Welcome Back 👋

            </h1>

            <p>

              Manage tasks dynamically

            </p>

          </div>

          {/* Actions */}

          <div className="top-actions">

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="search-box"
            />

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="new-task-btn"
            >

              <Plus size={20} />

              New Task

            </button>

          </div>

        </div>

        {/* Empty State */}

        {tasks.length === 0 ? (

          <div className="empty-state">

            <h2>

              No Tasks Available

            </h2>

            <p>

              Create tasks to start managing your workflow

            </p>

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="new-task-btn"
            >

              Create Task

            </button>

          </div>

        ) : (

          <>
            {/* Dashboard */}

            <div className="dashboard-grid">

              {/* Total */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <h2>
                    Total Tasks
                  </h2>

                  <ClipboardList />

                </div>

                <h1>
                  {totalTasks}
                </h1>

              </div>

              {/* Completed */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <h2>
                    Completed
                  </h2>

                  <CheckCircle2 color="green" />

                </div>

                <h1>
                  {completedTasks}
                </h1>

              </div>

              {/* Pending */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <h2>
                    Pending
                  </h2>

                  <Clock3 color="orange" />

                </div>

                <h1>
                  {pendingTasks}
                </h1>

              </div>

              {/* In Progress */}

              <div className="dashboard-card">

                <div className="dashboard-card-top">

                  <h2>
                    In Progress
                  </h2>

                  <CircleDashed color="blue" />

                </div>

                <h1>
                  {inProgressTasks}
                </h1>

              </div>

            </div>

            {/* Tasks */}

            <div className="tasks-section">

              <h2>

                Recent Tasks

              </h2>

              {filteredTasks
                .slice(0, 5)
                .map((task) => (

                  <div
                    key={task.id}
                    className="task-item"
                  >

                    <div className="task-item-top">

                      <div>

                        <h3>

                          {task.title}

                        </h3>

                        <p>

                          {task.description}

                        </p>

                      </div>

                      {/* Badges */}

                      <div className="task-badges">

                        {/* Priority */}

                        <span
                          className={`badge ${
                            task.priority ===
                            "High"
                              ? "high"
                              : task.priority ===
                                "Medium"
                              ? "medium"
                              : "low"
                          }`}
                        >

                          {task.priority}

                        </span>

                        {/* Status */}

                        <span
                          className={`badge ${
                            task.status ===
                            "Completed"
                              ? "completed"
                              : task.status ===
                                "In Progress"
                              ? "progress"
                              : "pending"
                          }`}
                        >

                          {task.status}

                        </span>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default WorkspaceLayout;