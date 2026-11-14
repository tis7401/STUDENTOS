

import "./App.css";

function Dashboard() {
  return (
    <>
      <header className="topbar">
        <div>
          <h2>Dashboard</h2>
          <p>Your academic overview</p>
        </div>
        <div className="profile">Student</div>
      </header>

      <section className="welcome">
        <h1>Welcome back!</h1>
        <p>Here's what's happening with your academics today.</p>
      </section>

      {/* Academic Summary */}
      <section className="stats-grid">

        <div className="stat-card">
          <p>Current CGPA</p>
          <h2>3.75</h2>
          <small>Out of 4.00</small>
        </div>

        <div className="stat-card">
          <p>Enrolled Courses</p>
          <h2>5</h2>
          <small>This semester</small>
        </div>

        <div className="stat-card">
          <p>Attendance</p>
          <h2>88%</h2>
          <small>Overall attendance</small>
        </div>

        <div className="stat-card">
          <p>Pending Tasks</p>
          <h2>4</h2>
          <small>Assignments and exams</small>
        </div>

      </section>

      {/* Lower Dashboard */}
      <section className="dashboard-grid">

        <div className="content-card">
          <h3>Upcoming Deadlines</h3>

          <div className="deadline">
            <div>
              <strong>Database Assignment</strong>
              <p>CSE 327</p>
            </div>
            <span>Nov 18</span>
          </div>

          <div className="deadline">
            <div>
              <strong>Algorithm Quiz</strong>
              <p>CSE 221</p>
            </div>
            <span>Nov 20</span>
          </div>

          <div className="deadline">
            <div>
              <strong>Project Submission</strong>
              <p>CSE 327</p>
            </div>
            <span>Nov 24</span>
          </div>
        </div>

        <div className="content-card">
          <h3>Study Overview</h3>
          <p className="study-description">
            Your study progress this week
          </p>

          <div className="progress-info">
            <span>Weekly study goal</span>
            <strong>6 / 10 hours</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <p className="study-note">
            Keep going! You're making progress.
          </p>
        </div>

      </section>
    </>
  );
}

export default Dashboard;
