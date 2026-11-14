import { useState } from "react";
import "./Grades.css";

function Grades() {
  const [courses, setCourses] = useState([
    { code: "CSE 327", name: "Software Engineering", credits: 3, grade: "A-" },
    { code: "CSE 221", name: "Algorithms", credits: 3, grade: "B+" },
    { code: "CSE 311", name: "Database Systems", credits: 3, grade: "A" },
    { code: "MAT 120", name: "Calculus", credits: 3, grade: "B" },
    { code: "EEE 141", name: "Electrical Circuits", credits: 3, grade: "A-" },
  ]);

  const gradePoints = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "D": 1.0,
    "F": 0.0,
  };

  const totalCredits = courses.reduce(
    (sum, course) => sum + course.credits, 0
  );

  const gpa = (
    courses.reduce(
      (sum, course) => sum + gradePoints[course.grade] * course.credits, 0
    ) / totalCredits
  ).toFixed(2);

  function updateGrade(index, newGrade) {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = newGrade;
    setCourses(updatedCourses);
  }

  return (
    <div className="grades-page">
      <header className="grades-header">
        <div>
          <h1>Grades & GPA</h1>
          <p>Track your academic performance and simulate your GPA.</p>
        </div>
      </header>

      <section className="grade-summary">
        <div className="grade-summary-card">
          <span>Current Semester GPA</span>
          <h2>{gpa}</h2>
          <small>Based on selected course grades</small>
        </div>

        <div className="grade-summary-card">
          <span>Overall CGPA</span>
          <h2>3.75</h2>
          <small>Sample cumulative result</small>
        </div>

        <div className="grade-summary-card">
          <span>Total Credit Hours</span>
          <h2>{totalCredits}</h2>
          <small>Current semester</small>
        </div>
      </section>

      <section className="grades-table-section">
        <h2>Course-wise Performance</h2>
        <p>Change a grade to see its effect on your semester GPA.</p>

        <div className="grades-table-wrapper">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Grade Points</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>
                    <select
                      value={course.grade}
                      onChange={(e) => updateGrade(index, e.target.value)}
                    >
                      {Object.keys(gradePoints).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{gradePoints[course.grade].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="gpa-note">
        <h3>GPA Simulator</h3>
        <p>
          Change any course grade above to instantly recalculate your
          estimated semester GPA.
        </p>
      </section>
    </div>
  );
}

export default Grades;