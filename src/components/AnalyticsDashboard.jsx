import {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./AnalyticsDashboard.css";

function AnalyticsDashboard() {

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

  /* Load */

  const loadTasks = () => {

    const storedTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    setTasks(storedTasks);

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

  /* Productivity */

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.floor(
          (completedTasks /
            totalTasks) *
            100
        );

  /* Weekly Data */

  const productivityData = [
    {
      day: "Pending",
      tasks: pendingTasks,
    },

    {
      day: "Progress",
      tasks: inProgressTasks,
    },

    {
      day: "Completed",
      tasks: completedTasks,
    },
  ];

  return (

    <div className="analytics-container">

      <div className="analytics-wrapper">

        {/* Header */}

        <div className="analytics-header">

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

          <div className="analytics-title">

            <h1>
              Analytics Dashboard
            </h1>

            <p>
              Track your task productivity dynamically
            </p>

          </div>

        </div>

        {/* Empty */}

        {tasks.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Analytics Available
            </h2>

            <p>
              Create tasks to view analytics
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
            {/* Cards */}

            <div className="analytics-grid">

              {/* Total */}

              <div className="analytics-card">

                <div className="card-top">

                  <div className="icon-box blue">

                    <ListTodo />

                  </div>

                  <span>
                    Total
                  </span>

                </div>

                <h2>
                  {totalTasks}
                </h2>

              </div>

              {/* Completed */}

              <div className="analytics-card">

                <div className="card-top">

                  <div className="icon-box green">

                    <CheckCircle2 />

                  </div>

                  <span>
                    Completed
                  </span>

                </div>

                <h2 className="green-text">

                  {completedTasks}

                </h2>

              </div>

              {/* Pending */}

              <div className="analytics-card">

                <div className="card-top">

                  <div className="icon-box yellow">

                    <Clock3 />

                  </div>

                  <span>
                    Pending
                  </span>

                </div>

                <h2 className="yellow-text">

                  {pendingTasks}

                </h2>

              </div>

              {/* Productivity */}

              <div className="analytics-card">

                <div className="card-top">

                  <div className="icon-box purple">

                    <TrendingUp />

                  </div>

                  <span>
                    Productivity
                  </span>

                </div>

                <h2 className="purple-text">

                  {completionRate}%

                </h2>

              </div>

            </div>

            {/* Graph */}

            <div className="graph-box">

              <div className="graph-header">

                <h2>
                  Task Progress
                </h2>

                <p>
                  Real-time task statistics
                </p>

              </div>

              {/* Bars */}

              <div className="graph-bars">

                {productivityData.map(
                  (data) => (

                    <div
                      key={data.day}
                      className="bar-item"
                    >

                      {/* Bar */}

                      <div
                        className="bar"
                        style={{
                          height: `${data.tasks * 60}px`,
                        }}
                      ></div>

                      {/* Number */}

                      <span className="bar-number">

                        {data.tasks}

                      </span>

                      {/* Label */}

                      <span className="bar-label">

                        {data.day}

                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default AnalyticsDashboard;