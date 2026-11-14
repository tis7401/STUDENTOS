
import { useState } from "react";
import "./Planner.css";

function Planner() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Revise Software Engineering",
      course: "CSE 327",
      date: "2026-11-15",
      duration: 2,
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Practice Binary Search",
      course: "CSE 221",
      date: "2026-11-16",
      duration: 1,
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Review Database Normalization",
      course: "CSE 311",
      date: "2026-11-17",
      duration: 2,
      priority: "High",
      completed: true,
    },
  ]);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("CSE 327");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [priority, setPriority] = useState("Medium");

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  const totalHours = tasks.reduce(
    (total, task) => total + Number(task.duration),
    0
  );

  const completedHours = completedTasks.reduce(
    (total, task) => total + Number(task.duration),
    0
  );

  const progress = totalHours
    ? Math.round((completedHours / totalHours) * 100)
    : 0;

  function addTask(e) {
    e.preventDefault();

    if (!title.trim() || !date) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      course,
      date,
      duration: Number(duration),
      priority,
      completed: false,
    };

    setTasks((previous) => [...previous, newTask]);

    setTitle("");
    setDate("");
    setDuration("1");
    setPriority("Medium");
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    return new Date(a.date) - new Date(b.date);
  });

  return (
    <>
      <header className="topbar">
        <div>
          <h2>Study Planner</h2>
          <p>Organize your study sessions and reach your goals</p>
        </div>
        <div className="profile">Student</div>
      </header>

      <section className="welcome">
        <h1>Your Personal Study Plan</h1>
        <p>
          Plan your study sessions, manage priorities, and track your
          academic progress.
        </p>
      </section>

      {/* Study Summary */}

      <section className="planner-stats">
        <div className="planner-stat-card">
          <p>Total Study Tasks</p>
          <h2>{tasks.length}</h2>
          <small>Planned activities</small>
        </div>

        <div className="planner-stat-card">
          <p>Pending Tasks</p>
          <h2>{pendingTasks.length}</h2>
          <small>Tasks remaining</small>
        </div>

        <div className="planner-stat-card">
          <p>Completed Tasks</p>
          <h2>{completedTasks.length}</h2>
          <small>Tasks finished</small>
        </div>

        <div className="planner-stat-card">
          <p>Planned Study Hours</p>
          <h2>{totalHours}h</h2>
          <small>{completedHours} hours completed</small>
        </div>
      </section>

      {/* Progress Overview */}

      <section className="content-card planner-progress-card">
        <div className="planner-section-heading">
          <div>
            <h3>Study Progress</h3>
            <p>Your overall study plan completion</p>
          </div>
          <strong>{progress}%</strong>
        </div>

        <div className="planner-progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>

        <p className="planner-progress-note">
          {progress === 100
            ? "Excellent! You completed all your planned study hours."
            : "Keep working towards completing your study plan!"}
        </p>
      </section>

      {/* Add Study Task */}

      <section className="content-card planner-form-card">
        <h3>Add a Study Session</h3>
        <p className="planner-description">
          Create a new activity for your study schedule.
        </p>

        <form onSubmit={addTask}>
          <div className="planner-form-grid">
            <label>
              Task Name
              <input
                type="text"
                placeholder="e.g. Revise Chapter 3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Course
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>CSE 327</option>
                <option>CSE 221</option>
                <option>CSE 311</option>
                <option>MAT 120</option>
                <option>EEE 141</option>
              </select>
            </label>

            <label>
              Study Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <label>
              Duration (Hours)
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
            </label>

            <label>
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>

          <button type="submit" className="planner-add-btn">
            + Add Study Task
          </button>
        </form>
      </section>

      {/* Study Schedule */}

      <section className="content-card planner-tasks-card">
        <div className="planner-section-heading">
          <div>
            <h3>My Study Schedule</h3>
            <p>Manage your upcoming study activities</p>
          </div>
          <span>{pendingTasks.length} pending</span>
        </div>

        {sortedTasks.length === 0 ? (
          <div className="planner-empty">
            <h3>No study tasks yet</h3>
            <p>Add your first study session to get started.</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <div
              className={`planner-task ${
                task.completed ? "task-completed" : ""
              }`}
              key={task.id}
            >
              <div className="planner-task-main">
                <div className="planner-task-title">
                  <h4>{task.title}</h4>
                  <span className={`priority-${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                  </span>
                </div>

                <p>
                  {task.course} · {task.duration} hour(s)
                </p>

                <small>
                  Due: {new Date(task.date + "T00:00:00").toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </small>
              </div>

              <div className="planner-task-actions">
                <button
                  className="planner-complete-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  className="planner-delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Study Recommendation */}

      <section className="content-card planner-recommendation">
        <div className="planner-recommendation-icon">✦</div>
        <div>
          <h3>Study Recommendation</h3>
          <p>
            {pendingTasks.length > 0
              ? `You have ${pendingTasks.length} pending study tasks. Start with your high-priority activities to stay on track.`
              : "You have no pending study tasks. Great job keeping up with your schedule!"}
          </p>
          <small>
            Recommendations currently use basic application logic.
            Adaptive recommendations will be integrated later.
          </small>
        </div>
      </section>
    </>
  );
}

export default Planner;
