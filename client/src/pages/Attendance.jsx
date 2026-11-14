import { useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [courses, setCourses] = useState([
    { code: "CSE 327", name: "Software Engineering", total: 20, attended: 18 },
    { code: "CSE 221", name: "Algorithms", total: 24, attended: 17 },
    { code: "CSE 311", name: "Database Systems", total: 20, attended: 19 },
    { code: "MAT 120", name: "Calculus", total: 22, attended: 16 },
    { code: "EEE 141", name: "Electrical Circuits", total: 18, attended: 16 },
  ]);

  const totalClasses = courses.reduce((sum, course) => sum + course.total, 0);
  const totalAttended = courses.reduce((sum, course) => sum + course.attended, 0);
  const overall = ((totalAttended / totalClasses) * 100).toFixed(1);

  function markAttendance(index, attended) {
    const updated = [...courses];
    updated[index].total += 1;

    if (attended) {
      updated[index].attended += 1;
    }

    setCourses(updated);
  }

  return (
    <div className="attendance-page">
      <header className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Monitor your class attendance and identify attendance risks.</p>
        </div>
      </header>

      <section className="attendance-summary">
        <div className="attendance-summary-card">
          <span>Overall Attendance</span>
          <h2>{overall}%</h2>
          <small>Across all enrolled courses</small>
        </div>

        <div className="attendance-summary-card">
          <span>Classes Attended</span>
          <h2>{totalAttended}</h2>
          <small>Present classes</small>
        </div>

        <div className="attendance-summary-card">
          <span>Classes Missed</span>
          <h2>{totalClasses - totalAttended}</h2>
          <small>Absent classes</small>
        </div>
      </section>

      <section className="attendance-list">
        <h2>Course-wise Attendance</h2>
        <p>Mark your next class as attended or missed to update the record.</p>

        {courses.map((course, index) => {
          const percentage = (course.attended / course.total) * 100;
          const isAtRisk = percentage < 75;

          return (
            <div className="attendance-course" key={course.code}>
              <div className="attendance-course-info">
                <div>
                  <h3>{course.code}</h3>
                  <p>{course.name}</p>
                </div>

                <strong className={isAtRisk ? "risk-text" : "safe-text"}>
                  {percentage.toFixed(1)}%
                </strong>
              </div>

              <div className="attendance-progress">
                <div
                  className={isAtRisk ? "risk-fill" : "safe-fill"}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="attendance-course-bottom">
                <span>
                  {course.attended} attended / {course.total} classes
                </span>

                <span className={isAtRisk ? "risk-label" : "safe-label"}>
                  {isAtRisk ? "Attendance at Risk" : "On Track"}
                </span>
              </div>

              <div className="attendance-actions">
                <button onClick={() => markAttendance(index, true)}>
                  + Present
                </button>
                <button onClick={() => markAttendance(index, false)}>
                  + Absent
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <section className="attendance-alert">
        <h3>Attendance Risk Insight</h3>
        <p>
          {courses.some((course) => (course.attended / course.total) * 100 < 75)
            ? "Some courses are below the 75% attendance threshold. Attend upcoming classes to improve your standing."
            : "Your attendance is currently at or above the 75% threshold in every course."}
        </p>
      </section>
    </div>
  );
}

export default Attendance;