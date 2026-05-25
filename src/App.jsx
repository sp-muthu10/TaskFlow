import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

/* Fast Loading */

import Authentication from "./components/Authentication";

/* Lazy Components */

const WorkspaceLayout = lazy(() =>
  import("./components/WorkspaceLayout")
);

const SmartTaskInput = lazy(() =>
  import("./components/SmartTaskInput")
);

const TaskListManager = lazy(() =>
  import("./components/TaskListManager")
);

const KanbanBoard = lazy(() =>
  import("./components/KanbanBoard")
);

const CalendarView = lazy(() =>
  import("./components/CalendarView")
);

const SearchFilter = lazy(() =>
  import("./components/SearchFilter")
);

const Notifications = lazy(() =>
  import("./components/Notifications")
);

const AnalyticsDashboard = lazy(() =>
  import("./components/AnalyticsDashboard")
);

function App() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
            Loading...
          </div>
        }
      >

        <Routes>

          {/* Login First */}

          <Route
            path="/"
            element={<Authentication />}
          />

          <Route
            path="/dashboard"
            element={<WorkspaceLayout />}
          />

          <Route
            path="/tasks"
            element={<SmartTaskInput />}
          />

          <Route
            path="/task-list"
            element={<TaskListManager />}
          />

          <Route
            path="/kanban"
            element={<KanbanBoard />}
          />

          <Route
            path="/calendar"
            element={<CalendarView />}
          />

          <Route
            path="/search"
            element={<SearchFilter />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsDashboard />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );

}

export default App;