
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Dashboard";
import Courses from "./pages/Courses";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";
import Tasks from "./pages/Tasks";
import Quiz from "./pages/Quiz";
import Planner from "./pages/Planner";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/grades" element={<Layout><Grades /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
        <Route path="/quiz" element={<Layout><Quiz /></Layout>} />
        <Route path="/planner" element={<Layout><Planner /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
