import {
  useState,
} from "react";

import {
  Flag,
  CalendarDays,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./SmartTaskInput.css";

function SmartTaskInput() {

  const navigate =
    useNavigate();

  /* Task State */

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      priority: "Low",
      status: "Pending",
      dueDate: "",
    });

  /* Error State */

  const [error, setError] =
    useState("");

  /* Loading State */

  const [loading, setLoading] =
    useState(false);

  /* Handle Input */

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setTaskData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");

  };

  /* Create Task */

  const createTask = async (e) => {

    e.preventDefault();

    /* Validation */

    if (
      taskData.title.trim() === "" ||
      taskData.description.trim() === ""
    ) {

      setError(
        "Please fill all required fields"
      );

      return;

    }

    setLoading(true);

    try {

      /* Existing Tasks */

      const existingTasks =
        JSON.parse(
          localStorage.getItem("tasks")
        ) || [];

      /* New Task */

      const newTask = {
        id: crypto.randomUUID(),

        title:
          taskData.title.trim(),

        description:
          taskData.description.trim(),

        priority:
          taskData.priority,

        status:
          taskData.status,

        dueDate:
          taskData.dueDate,

        createdAt:
          new Date().toISOString(),
      };

      /* Updated Tasks */

      const updatedTasks = [
        ...existingTasks,
        newTask,
      ];

      /* Save */

      localStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
      );

      /* Real-Time Refresh */

      window.dispatchEvent(
        new Event("taskUpdated")
      );

      /* Reset */

      setTaskData({
        title: "",
        description: "",
        priority: "Low",
        status: "Pending",
        dueDate: "",
      });

      /* Redirect */

      navigate("/dashboard");

    } catch (error) {

      setError(
        "Failed to create task"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="task-input-container">

      <div className="task-input-wrapper">

        {/* Header */}

        <div className="task-input-header">

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

          <div className="task-input-title">

            <h1>
              Create New Task
            </h1>

            <p>
              Add tasks dynamically to your workflow
            </p>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={createTask}
          className="task-form"
        >

          {/* Error */}

          {error && (

            <div className="task-error">

              {error}

            </div>

          )}

          {/* Title */}

          <div className="form-group">

            <label>

              Task Title

            </label>

            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />

          </div>

          {/* Description */}

          <div className="form-group">

            <label>

              Description

            </label>

            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="5"
            ></textarea>

          </div>

          {/* Grid */}

          <div className="form-grid">

            {/* Priority */}

            <div className="form-group">

              <label>

                <Flag size={18} />

                Priority

              </label>

              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>

            {/* Status */}

            <div className="form-group">

              <label>

                <ClipboardList size={18} />

                Status

              </label>

              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
              >

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

            {/* Due Date */}

            <div className="form-group full-width">

              <label>

                <CalendarDays size={18} />

                Due Date

              </label>

              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="form-buttons">

            {/* Create */}

            <button
              type="submit"
              disabled={loading}
              className="create-btn"
            >

              {loading
                ? "Creating..."
                : "Create Task"}

            </button>

            {/* Cancel */}

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="cancel-btn"
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default SmartTaskInput;