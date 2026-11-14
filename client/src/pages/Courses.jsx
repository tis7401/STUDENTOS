
import { useState } from "react";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([
    {
      code: "CSE 327",
      name: "Software Engineering",
      instructor: "Dr. Ahmed",
      credits: 3,
      progress: 75,
      color: "blue",
    },
    {
      code: "CSE 221",
      name: "Algorithms",
      instructor: "Dr. Rahman",
      credits: 3,
      progress: 60,
      color: "purple",
    },
    {
      code: "CSE 311",
      name: "Database Systems",
      instructor: "Dr. Karim",
      credits: 3,
      progress: 85,
      color: "green",
    },
    {
      code: "MAT 120",
      name: "Calculus",
      instructor: "Dr. Hasan",
      credits: 3,
      progress: 45,
      color: "orange",
    },
    {
      code: "EEE 141",
      name: "Electrical Circuits",
      instructor: "Dr. Islam",
      credits: 3,
      progress: 70,
      color: "pink",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    instructor: "",
    credits: 3,
  });

  function handleAddCourse(event) {
    event.preventDefault();

    setCourses([
      ...courses,
      {
        ...newCourse,
        progress: 0,
        color: "blue",
      },
    ]);

    setNewCourse({
      code: "",
      name: "",
      instructor: "",
      credits: 3,
    });

    setShowForm(false);
  }

  const filteredCourses = courses.filter((course) =>
    `${course.code} ${course.name} ${course.instructor}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalCredits = courses.reduce(
    (total, course) => total + Number(course.credits),
    0
  );

  return (
    <div className="courses-page">
      <header className="courses-header">
        <div>
          <h1>My Courses</h1>
          <p>Manage your enrolled courses and track your progress.</p>
        </div>

        <button
          className="add-course-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Course
        </button>
      </header>

      <section className="course-summary">
        <div className="course-summary-card">
          <span>Total Courses</span>
          <h2>{courses.length}</h2>
          <small>Enrolled this semester</small>
        </div>

        <div className="course-summary-card">
          <span>Total Credit Hours</span>
          <h2>{totalCredits}</h2>
          <small>Academic credits</small>
        </div>

        <div className="course-summary-card">
          <span>Semester</span>
          <h2>Fall 2026</h2>
          <small>Current semester</small>
        </div>
      </section>

      {showForm && (
        <form className="add-course-form" onSubmit={handleAddCourse}>
          <h2>Add a New Course</h2>

          <input
            placeholder="Course Code (e.g. CSE 327)"
            value={newCourse.code}
            onChange={(e) =>
              setNewCourse({ ...newCourse, code: e.target.value })
            }
            required
          />

          <input
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Instructor Name"
            value={newCourse.instructor}
            onChange={(e) =>
              setNewCourse({ ...newCourse, instructor: e.target.value })
            }
            required
          />

          <input
            type="number"
            min="1"
            max="6"
            placeholder="Credit Hours"
            value={newCourse.credits}
            onChange={(e) =>
              setNewCourse({ ...newCourse, credits: e.target.value })
            }
            required
          />

          <button type="submit" className="add-course-btn">
            Save Course
          </button>
        </form>
      )}

      <div className="courses-toolbar">
        <h2>Enrolled Courses</h2>

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="courses-grid">
        {filteredCourses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className={`course-card-top ${course.color}`}>
              <span>{course.code}</span>
              <span>{course.credits} Credits</span>
            </div>

            <div className="course-card-body">
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>

              <div className="course-progress-info">
                <span>Course Progress</span>
                <strong>{course.progress}%</strong>
              </div>

              <div className="course-progress-bar">
                <div
                  className={`course-progress-fill ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <p>No courses found.</p>
        )}
      </section>
    </div>
  );
}

export default Courses;
