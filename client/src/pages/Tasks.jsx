import { useState } from "react";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Software Engineering Project",
      course: "CSE 327",
      type: "Assignment",
      due: "2026-11-18",
      status: "Pending",
    },
    {
      id: 2,
      title: "Algorithm Quiz",
      course: "CSE 221",
      type: "Exam",
      due: "2026-11-20",
      status: "Pending",
    },
    {
      id: 3,
      title: "Database Design Report",
      course: "CSE 311",
      type: "Assignment",
      due: "2026-11-24",
      status: "Pending",
    },
    {
      id: 4,
      title: "Calculus Problem Set",
      course: "MAT 120",
      type: "Assignment",
      due: "2026-11-10",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    course: "",
    type: "Assignment",
    due: "",
  });

  function addTask(event) {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        status: "Pending",
      },
    ]);

    setNewTask({
      title: "",
      course: "",
      type: "Assignment",
      due: "",
    });

    setShowForm(false);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  }

  const pending = tasks.filter((task) => task.status === "Pending").length;
  const completed = tasks.length - pending;

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <div>
          <h1>Assignments & Exams</h1>
          <p>Organize your academic tasks and keep track of deadlines.</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          + Add Task
        </button>
      </header>

      <section className="tasks-summary">
        <div className="tasks-summary-card">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
        </div>

        <div className="tasks-summary-card">
          <span>Pending</span>
          <h2>{pending}</h2>
        </div>

        <div className="tasks-summary-card">
          <span>Completed</span>
          <h2>{completed}</h2>
        </div>
      </section>

      {showForm && (
        <form className="task-form" onSubmit={addTask}>
          <h2>Add a New Task</h2>

          <input
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            required
          />

          <input
            placeholder="Course code (e.g. CSE 327)"
            value={newTask.course}
            onChange={(e) =>
              setNewTask({ ...newTask, course: e.target.value })
            }
            required
          />

          <select
            value={newTask.type}
            onChange={(e) =>
              setNewTask({ ...newTask, type: e.target.value })
            }
          >
            <option>Assignment</option>
            <option>Exam</option>
            <option>Quiz</option>
            <option>Project</option>
          </select>

          <input
            type="date"
            value={newTask.due}
            onChange={(e) =>
              setNewTask({ ...newTask, due: e.target.value })
            }
            required
          />

          <button type="submit">Save Task</button>
        </form>
      )}

      <section className="tasks-list">
        <h2>All Tasks</h2>

        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <div className="task-details">
              <span className={`task-type ${task.type.toLowerCase()}`}>
                {task.type}
              </span>

              <h3>{task.title}</h3>
              <p>{task.course} · Due: {task.due || "Not set"}</p>
            </div>

            <div className="task-actions">
              <span
                className={
                  task.status === "Completed"
                    ? "completed-status"
                    : "pending-status"
                }
              >
                {task.status}
              </span>

              <button onClick={() => toggleTask(task.id)}>
                {task.status === "Completed" ? "Undo" : "Mark Complete"}
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && <p>No tasks added yet.</p>}
      </section>
    </div>
  );
}

export default Tasks;