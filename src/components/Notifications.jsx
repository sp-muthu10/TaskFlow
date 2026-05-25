import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  ArrowLeft,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Notifications.css";

function Notifications() {

  const navigate =
    useNavigate();

  /* Notifications */

  const [notifications, setNotifications] =
    useState([]);

  /* Load */

  useEffect(() => {

    loadNotifications();

    window.addEventListener(
      "taskUpdated",
      loadNotifications
    );

    return () => {

      window.removeEventListener(
        "taskUpdated",
        loadNotifications
      );

    };

  }, []);

  /* Load Function */

  const loadNotifications = () => {

    const tasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    /* Convert Tasks -> Notifications */

    const generatedNotifications =
      tasks.map((task) => ({

        id: task.id,

        title:
          task.title,

        status:
          task.status,

        dueDate:
          task.dueDate,

        priority:
          task.priority,

      }));

    setNotifications(
      generatedNotifications
    );

  };

  /* Delete Notification */

  const deleteNotification = (
    id
  ) => {

    const updated =
      notifications.filter(
        (notification) =>
          notification.id !== id
      );

    setNotifications(updated);

  };

  return (

    <div className="notification-container">

      <div className="notification-wrapper">

        {/* Header */}

        <div className="notification-header">

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

          <div className="notification-title">

            <h1>
              Notifications
            </h1>

            <p>
              Track updates from your tasks
            </p>

          </div>

        </div>

        {/* Empty */}

        {notifications.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Notifications
            </h2>

            <p>
              Create tasks to receive notifications
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

          <div className="notification-list">

            {notifications.map(
              (notification) => (

                <div
                  key={notification.id}
                  className="notification-card"
                >

                  {/* Left */}

                  <div className="notification-left">

                    <div className="bell-icon">

                      <Bell size={24} />

                    </div>

                    <div>

                      <h2>

                        {notification.title}

                      </h2>

                      <p>

                        Status:
                        {" "}
                        {notification.status}

                      </p>

                      <span>

                        Due:
                        {" "}
                        {notification.dueDate ||
                          "No Due Date"}

                      </span>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="notification-right">

                    {/* Priority */}

                    <span
                      className={`priority-badge ${
                        notification.priority ===
                        "High"
                          ? "high"
                          : notification.priority ===
                            "Medium"
                          ? "medium"
                          : "low"
                      }`}
                    >

                      {notification.priority}

                    </span>

                    {/* Delete */}

                    <button
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                      className="delete-btn"
                    >

                      <Trash2 size={20} />

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Notifications;