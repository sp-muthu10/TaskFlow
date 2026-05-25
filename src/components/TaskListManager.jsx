import {
  useEffect,
  useState,
} from "react";

import {
  Trash2,
  SquarePen,
  CheckCircle2,
  Circle,
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./TaskListManager.css";

function TaskListManager() {

  const navigate =
    useNavigate();

  /* Tasks */

  const [tasks, setTasks] =
    useState([]);

  /* Edit States */

  const [editTaskId, setEditTaskId] =
    useState(null);

  const [editedTitle, setEditedTitle] =
    useState("");

  /* Load Tasks */

  useEffect(() => {

    loadTasks();

    /* Real-Time Updates */

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

  const deleteTask = (id) => {

    const updatedTasks =
      tasks.filter(
        (task) => task.id !== id
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

  /* Toggle */

  const toggleTaskStatus = (id) => {

    const updatedTasks =
      tasks.map((task) =>

        task.id === id
          ? {
              ...task,
              status:
                task.status ===
                "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : task

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

  /* Start Edit */

  const startEditing = (task) => {

    setEditTaskId(task.id);

    setEditedTitle(task.title);

  };

  /* Save Edit */

  const saveEditedTask = (id) => {

    if (
      editedTitle.trim() === ""
    ) return;

    const updatedTasks =
      tasks.map((task) =>

        task.id === id
          ? {
              ...task,
              title:
                editedTitle.trim(),
            }
          : task

      );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    window.dispatchEvent(
      new Event("taskUpdated")
    );

    setEditTaskId(null);

  };

  return (

    <div className="task-manager-container">

      <div className="task-manager-wrapper">

        {/* Header */}

        <div className="task-manager-header">

          {/* Back */}

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="back-btn"
          >

            <ArrowLeft size={22} />

          </button>

          {/* Heading */}

          <div className="task-manager-title">

            <h1>

              Task List Manager

            </h1>

            <p>

              Manage tasks dynamically

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

              Create your first task to get started

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

          <div className="task-list">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="task-card"
              >

                <div className="task-card-content">

                  {/* Left */}

                  <div className="task-left">

                    {/* Status */}

                    <button
                      onClick={() =>
                        toggleTaskStatus(
                          task.id
                        )
                      }
                      className="status-btn"
                    >

                      {task.status ===
                      "Completed" ? (

                        <CheckCircle2
                          size={30}
                          color="#16a34a"
                        />

                      ) : (

                        <Circle
                          size={30}
                          color="#9ca3af"
                        />

                      )}

                    </button>

                    {/* Content */}

                    <div className="task-content">

                      {/* Edit */}

                      {editTaskId ===
                      task.id ? (

                        <input
                          type="text"
                          value={
                            editedTitle
                          }
                          onChange={(e) =>
                            setEditedTitle(
                              e.target.value
                            )
                          }
                          className="edit-input"
                        />

                      ) : (

                        <h2
                          className={`task-title ${
                            task.status ===
                            "Completed"
                              ? "completed-task"
                              : ""
                          }`}
                        >

                          {task.title}

                        </h2>

                      )}

                      {/* Description */}

                      <p className="task-description">

                        {task.description}

                      </p>

                      {/* Footer */}

                      <div className="task-footer">

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

                        {/* Due Date */}

                        <span className="date-text">

                          {task.dueDate ||
                            "No Due Date"}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="task-actions">

                    {/* Save/Edit */}

                    {editTaskId ===
                    task.id ? (

                      <button
                        onClick={() =>
                          saveEditedTask(
                            task.id
                          )
                        }
                        className="save-btn"
                      >

                        Save

                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          startEditing(
                            task
                          )
                        }
                        className="edit-btn"
                      >

                        <SquarePen size={20} />

                      </button>

                    )}

                    {/* Delete */}

                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      className="delete-btn"
                    >

                      <Trash2 size={20} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default TaskListManager;