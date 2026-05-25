import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./KanbanBoard.css";

function KanbanBoard() {

  const navigate =
    useNavigate();

  /* Tasks */

  const [tasks, setTasks] =
    useState([]);

  /* Columns */

  const statuses = [
    "Pending",
    "In Progress",
    "Completed",
  ];

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

  /* Load Tasks */

  const loadTasks = () => {

    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);

  };

  /* Drag */

  const handleDragStart = (
    e,
    taskId
  ) => {

    e.dataTransfer.setData(
      "taskId",
      taskId
    );

  };

  /* Drop */

  const handleDrop = (
    e,
    newStatus
  ) => {

    const taskId =
      e.dataTransfer.getData("taskId");

    const updatedTasks =
      tasks.map((task) =>

        task.id === taskId
          ? {
              ...task,
              status: newStatus,
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

  /* Allow */

  const allowDrop = (e) => {

    e.preventDefault();

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

  return (

    <div className="kanban-container">

      <div className="kanban-wrapper">

        {/* Header */}

        <div className="kanban-header">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="back-btn"
          >

            <ArrowLeft size={22} />

          </button>

          <div className="kanban-title">

            <h1>
              Kanban Board
            </h1>

            <p>
              Drag and manage tasks dynamically
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
              Create tasks to use the Kanban board
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

          <div className="kanban-board">

            {statuses.map((status) => (

              <div
                key={status}
                onDrop={(e) =>
                  handleDrop(
                    e,
                    status
                  )
                }
                onDragOver={allowDrop}
                className="kanban-column"
              >

                {/* Header */}

                <div className="column-header">

                  <h2>

                    {status}

                  </h2>

                  <span className="task-count">

                    {
                      tasks.filter(
                        (task) =>
                          task.status ===
                          status
                      ).length
                    }

                  </span>

                </div>

                {/* Tasks */}

                <div className="kanban-tasks">

                  {tasks
                    .filter(
                      (task) =>
                        task.status ===
                        status
                    )
                    .map((task) => (

                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e,
                            task.id
                          )
                        }
                        className="kanban-card"
                      >

                        {/* Top */}

                        <div className="card-top">

                          <h3>

                            {task.title}

                          </h3>

                          <button
                            onClick={() =>
                              deleteTask(
                                task.id
                              )
                            }
                            className="delete-btn"
                          >

                            <Trash2 size={20} />

                          </button>

                        </div>

                        {/* Description */}

                        <p className="card-description">

                          {task.description}

                        </p>

                        {/* Footer */}

                        <div className="card-footer">

                          <span
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

                          </span>

                          <span className="date-text">

                            {task.dueDate ||
                              "No Date"}

                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default KanbanBoard;