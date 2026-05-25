import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./CalendarView.css";

function CalendarView() {

  const navigate =
    useNavigate();

  /* Tasks */

  const [tasks, setTasks] =
    useState([]);

  /* Load Tasks */

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

  return (

    <div className="calendar-container">

      <div className="calendar-wrapper">

        {/* Header */}

        <div className="calendar-header">

          {/* Back */}

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="back-btn"
          >

            <ArrowLeft size={22} />

          </button>

          {/* Title */}

          <div className="calendar-title">

            <h1>
              Calendar View
            </h1>

            <p>
              View all tasks based on due dates
            </p>

          </div>

        </div>

        {/* Empty */}

        {tasks.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Tasks Available
            </h2>

            <p>
              Create tasks to view calendar schedule
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

          <div className="calendar-grid">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="calendar-card"
              >

                {/* Top */}

                <div className="calendar-card-top">

                  <div>

                    <h2>
                      {task.title}
                    </h2>

                    <p>
                      {task.description}
                    </p>

                  </div>

                  <div
                    className={`priority-badge ${
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

                  </div>

                </div>

                {/* Date */}

                <div className="date-box">

                  <CalendarDays size={20} />

                  <span>

                    {task.dueDate ||
                      "No Due Date"}

                  </span>

                </div>

                {/* Footer */}

                <div className="calendar-footer">

                  <span
                    className={`status-badge ${
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

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default CalendarView;