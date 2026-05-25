import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./SearchFilter.css";

function SearchFilter() {

  const navigate =
    useNavigate();

  /* States */

  const [tasks, setTasks] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  /* Load */

  useEffect(() => {

    loadTasks();

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

  /* Load Function */

  const loadTasks = () => {

    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);

  };

  /* Delete */

  const deleteTask = (taskId) => {

    const updatedTasks =
      tasks.filter(
        (task) => task.id !== taskId
      );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    window.dispatchEvent(
      new Event("taskUpdated")
    );

  };

  /* Filter */

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority ===
          priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        task.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );

    });

  return (

    <div className="search-container">

      <div className="search-wrapper">

        {/* Header */}

        <div className="search-header">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="back-btn"
          >

            <ArrowLeft size={22} />

          </button>

          <div className="search-title">

            <h1>
              Search Tasks
            </h1>

            <p>
              Search and filter tasks dynamically
            </p>

          </div>

        </div>

        {/* Empty */}

        {tasks.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Tasks Found
            </h2>

            <p>
              Create tasks first
            </p>

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="create-btn"
            >

              Create Task

            </button>

          </div>

        ) : (

          <>
            {/* Filters */}

            <div className="filter-box">

              <div className="filter-grid">

                {/* Search */}

                <div className="search-input-box">

                  <Search
                    size={20}
                    className="search-icon"
                  />

                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                    className="search-input"
                  />

                </div>

                {/* Priority */}

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(
                      e.target.value
                    )
                  }
                  className="filter-select"
                >

                  <option value="All">
                    All Priorities
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

                {/* Status */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="filter-select"
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

            </div>

            {/* Results */}

            <div className="results-header">

              <SlidersHorizontal />

              <h2>

                Results (
                {filteredTasks.length}
                )

              </h2>

            </div>

            {/* No Match */}

            {filteredTasks.length === 0 ? (

              <div className="no-match">

                <h2>
                  No Matching Tasks
                </h2>

                <p>
                  Try changing filters
                </p>

              </div>

            ) : (

              <div className="tasks-grid">

                {filteredTasks.map((task) => (

                  <div
                    key={task.id}
                    className="task-card"
                  >

                    {/* Top */}

                    <div className="task-card-top">

                      <div>

                        <h2>
                          {task.title}
                        </h2>

                        <p>
                          {task.description}
                        </p>

                      </div>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          deleteTask(task.id)
                        }
                        className="delete-btn"
                      >

                        <Trash2 size={22} />

                      </button>

                    </div>

                    {/* Footer */}

                    <div className="task-footer">

                      {/* Priority */}

                      <span
                        className={`badge ${
                          task.priority === "High"
                            ? "high"
                            : task.priority === "Medium"
                            ? "medium"
                            : "low"
                        }`}
                      >

                        {task.priority}

                      </span>

                      {/* Status */}

                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "completed"
                            : task.status === "In Progress"
                            ? "progress"
                            : "pending"
                        }`}
                      >

                        {task.status}

                      </span>

                      {/* Date */}

                      <span className="date-text">

                        {task.dueDate ||
                          "No Due Date"}

                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

}

export default SearchFilter;