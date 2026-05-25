import {
  CalendarDays,
  Clock3,
  Flag,
  Trash2,
  SquarePen,
  CheckCheck,
} from "lucide-react";

import "./TaskCard.css";

function TaskCard({
  task,
  deleteTask,
  completeTask,
  editTask,
}) {

  return (

    <div className="task-card">

      {/* Top Section */}

      <div className="task-card-top">

        {/* Task Info */}

        <div className="task-info">

          <h1>

            {task.title}

          </h1>

          <p>

            {task.description}

          </p>

        </div>

        {/* Priority */}

        <div
          className={`priority-badge ${
            task.priority === "High"
              ? "high-priority"
              : task.priority === "Medium"
              ? "medium-priority"
              : "low-priority"
          }`}
        >

          {task.priority || "Low"}

        </div>

      </div>

      {/* Middle */}

      <div className="task-middle">

        {/* Due Date */}

        <div className="task-box">

          <div className="task-box-header">

            <CalendarDays size={18} />

            <h2>

              Due Date

            </h2>

          </div>

          <p>

            {task.dueDate ||
              "No Due Date"}

          </p>

        </div>

        {/* Status */}

        <div className="task-box">

          <div className="task-box-header">

            <Clock3 size={18} />

            <h2>

              Status

            </h2>

          </div>

          <span
            className={`status-badge ${
              task.status ===
              "Completed"
                ? "completed-status"
                : task.status ===
                  "In Progress"
                ? "progress-status"
                : "pending-status"
            }`}
          >

            {task.status ||
              "Pending"}

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="task-footer">

        {/* Left */}

        <div className="task-footer-left">

          <Flag
            size={18}
            className="footer-flag"
          />

          <span className="task-priority-tag">

            {task.priority ||
              "Low"}

          </span>

          <span className="created-date">

            Created:
            {" "}

            {task.createdAt
              ? new Date(
                  task.createdAt
                ).toLocaleDateString()
              : "Unknown"}

          </span>

        </div>

      </div>

      {/* Buttons */}

      <div className="task-buttons">

        {/* Complete */}

        <button
          onClick={() =>
            completeTask(task.id)
          }
          disabled={
            task.status ===
            "Completed"
          }
          className="complete-btn"
        >

          <CheckCheck size={20} />

          {task.status ===
          "Completed"
            ? "Completed"
            : "Complete"}

        </button>

        {/* Right Buttons */}

        <div className="action-buttons">

          {/* Edit */}

          <button
            onClick={() =>
              editTask(task.id)
            }
            className="edit-btn"
          >

            <SquarePen size={20} />

          </button>

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

  );

}

export default TaskCard;