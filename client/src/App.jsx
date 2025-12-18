import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
