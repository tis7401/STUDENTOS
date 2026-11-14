
import { useState } from "react";
import "./Quiz.css";

const questionBank = [
  {
    course: "CSE 327",
    topic: "Software Engineering",
    difficulty: "Easy",
    type: "MCQ",
    question: "What is the main purpose of software engineering?",
    options: [
      "Writing code only",
      "Developing reliable and maintainable software",
      "Designing computer hardware",
      "Managing databases only",
    ],
    answer: 1,
    explanation:
      "Software engineering applies systematic methods to develop reliable, maintainable software.",
  },
  {
    course: "CSE 327",
    topic: "Software Engineering",
    difficulty: "Medium",
    type: "MCQ",
    question:
      "A development team frequently receives changing requirements. Which development approach is most suitable?",
    options: ["Waterfall", "Agile", "Big Bang", "Code and Fix"],
    answer: 1,
    explanation:
      "Agile supports iterative development and adapts to changing requirements through continuous feedback.",
  },
  {
    course: "CSE 327",
    topic: "Software Engineering",
    difficulty: "Hard",
    type: "True/False",
    question:
      "In software testing, passing all test cases proves that a program is completely free of defects.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Testing can reveal defects, but it cannot generally prove that software has no defects.",
  },
  {
    course: "CSE 221",
    topic: "Data Structures",
    difficulty: "Easy",
    type: "MCQ",
    question: "Which data structure follows the FIFO principle?",
    options: ["Stack", "Tree", "Queue", "Graph"],
    answer: 2,
    explanation:
      "A queue follows First In, First Out: the first element inserted is the first one removed.",
  },
  {
    course: "CSE 221",
    topic: "Data Structures",
    difficulty: "Medium",
    type: "MCQ",
    question:
      "What is the time complexity of accessing an element by index in an array?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    answer: 2,
    explanation:
      "Arrays support direct index-based access, which takes constant time, O(1).",
  },
  {
    course: "CSE 221",
    topic: "Algorithms",
    difficulty: "Medium",
    type: "MCQ",
    question:
      "What is the worst-case time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: 2,
    explanation:
      "Binary search halves the remaining search space after each comparison.",
  },
  {
    course: "CSE 221",
    topic: "Algorithms",
    difficulty: "Hard",
    type: "True/False",
    question:
      "Dijkstra's algorithm guarantees shortest paths when all edge weights are non-negative.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "Dijkstra's algorithm works correctly with non-negative edge weights. Negative edges can invalidate its greedy decisions.",
  },
  {
    course: "CSE 311",
    topic: "Database Systems",
    difficulty: "Easy",
    type: "MCQ",
    question: "What is the main purpose of a primary key?",
    options: [
      "To uniquely identify each record",
      "To sort records alphabetically",
      "To connect a database to the internet",
      "To delete duplicate tables",
    ],
    answer: 0,
    explanation:
      "A primary key uniquely identifies each row in a database table.",
  },
  {
    course: "CSE 311",
    topic: "Database Systems",
    difficulty: "Medium",
    type: "True/False",
    question:
      "A foreign key can establish a relationship between two database tables.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "A foreign key references a key in another table and helps maintain referential integrity.",
  },
  {
    course: "CSE 311",
    topic: "Database Systems",
    difficulty: "Hard",
    type: "MCQ",
    question:
      "Which normal form primarily eliminates partial functional dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 1,
    explanation:
      "Second Normal Form eliminates partial dependencies of non-key attributes on candidate keys.",
  },
  {
    course: "MAT 120",
    topic: "Calculus",
    difficulty: "Easy",
    type: "MCQ",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2"],
    answer: 1,
    explanation:
      "Using the power rule, the derivative of x² is 2x.",
  },
  {
    course: "EEE 141",
    topic: "Electrical Circuits",
    difficulty: "Medium",
    type: "True/False",
    question:
      "The voltage across an ideal capacitor cannot change instantaneously when its current is finite.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "A finite current produces a continuous change in capacitor voltage, so an instantaneous voltage jump would require an impulse current.",
  },
];

function Quiz() {
  const [course, setCourse] = useState("All Courses");
  const [topic, setTopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("All Levels");
  const [type, setType] = useState("Mixed");
  const [questionCount, setQuestionCount] = useState("5");

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const courses = [
    "All Courses",
    "CSE 327",
    "CSE 221",
    "CSE 311",
    "MAT 120",
    "EEE 141",
  ];

  const topics = [
    "All Topics",
    ...new Set(
      questionBank
        .filter(
          (q) => course === "All Courses" || q.course === course
        )
        .map((q) => q.topic)
    ),
  ];

  const availableQuestions = questionBank.filter((q) => {
    return (
      (course === "All Courses" || q.course === course) &&
      (topic === "All Topics" || q.topic === topic) &&
      (difficulty === "All Levels" || q.difficulty === difficulty) &&
      (type === "Mixed" ||
        (type === "MCQ" && q.type === "MCQ") ||
        (type === "True/False" && q.type === "True/False"))
    );
  });

  function startQuiz() {
    const shuffled = [...availableQuestions];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selectedQuestions = shuffled.slice(
      0,
      Math.min(Number(questionCount), shuffled.length)
    );

    if (selectedQuestions.length === 0) return;

    setQuizQuestions(selectedQuestions);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setStarted(true);
  }

  function chooseAnswer(index) {
    if (selected !== null) return;

    setSelected(index);

    setAnswers((previous) => [
      ...previous,
      {
        question: quizQuestions[current],
        selected: index,
      },
    ]);
  }

  function nextQuestion() {
    if (current === quizQuestions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((previous) => previous + 1);
      setSelected(null);
    }
  }

  function restartQuiz() {
    setStarted(false);
    setFinished(false);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setQuizQuestions([]);
  }

  const score = answers.filter(
    (item) => item.selected === item.question.answer
  ).length;

  const percentage = quizQuestions.length
    ? Math.round((score / quizQuestions.length) * 100)
    : 0;

  const question = quizQuestions[current];

  const topicPerformance = finished
    ? [...new Set(quizQuestions.map((q) => q.topic))].map((name) => {
        const related = answers.filter(
          (item) => item.question.topic === name
        );

        const correct = related.filter(
          (item) => item.selected === item.question.answer
        ).length;

        return {
          name,
          correct,
          total: related.length,
          percentage: Math.round((correct / related.length) * 100),
        };
      })
    : [];

  return (
    <>
      <header className="topbar">
        <div>
          <h2>AI Quiz & Learning</h2>
          <p>Test your knowledge and improve your performance</p>
        </div>
        <div className="profile">Student</div>
      </header>

      <section className="welcome">
        <h1>Lecture-to-Quiz Learning</h1>
        <p>
          Practice questions, understand your mistakes, and identify
          topics that need more attention.
        </p>
      </section>

      {!started ? (
        <section className="content-card quiz-start-card">
          <div className="quiz-symbol">✦</div>
          <h2>Build Your Practice Quiz</h2>
          <p>
            Customize your quiz based on your courses, topics, and
            learning goals.
          </p>

          <div className="quiz-settings">
            <label>
              Course
              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setTopic("All Topics");
                }}
              >
                {courses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Topic
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Difficulty
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>All Levels</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>

            <label>
              Question Type
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Mixed</option>
                <option>MCQ</option>
                <option>True/False</option>
              </select>
            </label>

            <label>
              Number of Questions
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
              </select>
            </label>
          </div>

          <div className="quiz-availability">
            <strong>{availableQuestions.length}</strong> questions available
            for your selected preferences.
          </div>

          <button
            className="quiz-primary-btn"
            onClick={startQuiz}
            disabled={availableQuestions.length === 0}
          >
            Start Quiz
          </button>

          {availableQuestions.length === 0 && (
            <p className="quiz-warning">
              No questions match these filters. Try changing your selections.
            </p>
          )}
        </section>
      ) : finished ? (
        <section className="content-card quiz-result-card">
          <div className="quiz-symbol">🏆</div>
          <h2>Quiz Completed!</h2>
          <p>Your final score</p>
          <h1>{score}/{quizQuestions.length}</h1>
          <p>You scored {percentage}%.</p>

          <div className="quiz-explanation">
            {percentage >= 80
              ? "Excellent work! You have a strong understanding of these topics."
              : percentage >= 50
              ? "Good effort! Review the topics where you lost marks."
              : "Keep practicing! Focus on reviewing the explanations and weaker topics."}
          </div>

          <div className="quiz-performance">
            <h3>Topic-wise Performance</h3>

            {topicPerformance.map((item) => (
              <div className="topic-result" key={item.name}>
                <div className="topic-result-info">
                  <strong>{item.name}</strong>
                  <span>{item.correct}/{item.total} correct</span>
                </div>

                <div className="quiz-progress">
                  <div style={{ width: `${item.percentage}%` }} />
                </div>

                <small>{item.percentage}%</small>

                {item.percentage < 60 && (
                  <p className="quiz-warning">
                    Recommended: Revise this topic.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Answer Review */}
          <div className="quiz-review">
            <h3>Review Your Answers</h3>
            <p className="quiz-review-subtitle">
              Understand your mistakes and learn from each question.
            </p>

            {answers.map((item, index) => {
              const isCorrect =
                item.selected === item.question.answer;

              return (
                <div className="review-item" key={index}>
                  <div className="review-question-heading">
                    <strong>Question {index + 1}</strong>

                    <span
                      className={
                        isCorrect
                          ? "review-correct"
                          : "review-incorrect"
                      }
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <h4>{item.question.question}</h4>

                  <p>
                    <strong>Your answer: </strong>
                    {item.question.options[item.selected]}
                  </p>

                  <p>
                    <strong>Correct answer: </strong>
                    {item.question.options[item.question.answer]}
                  </p>

                  <div className="review-explanation">
                    <strong>Explanation</strong>
                    <p>{item.question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="quiz-primary-btn" onClick={restartQuiz}>
            Create Another Quiz
          </button>
        </section>
      ) : (
        <section className="content-card quiz-question-card">
          <div className="quiz-question-top">
            <span>
              Question {current + 1} of {quizQuestions.length}
            </span>
            <span>
              {question.topic} · {question.difficulty}
            </span>
          </div>

          <div className="quiz-progress">
            <div
              style={{
                width: `${((current + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>

          <div className="quiz-type-label">{question.type}</div>

          <h2>{question.question}</h2>

          <div className="quiz-options">
            {question.options.map((option, index) => {
              let className = "quiz-option";

              if (selected !== null && index === question.answer) {
                className += " correct";
              } else if (selected === index) {
                className += " incorrect";
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => chooseAnswer(index)}
                  disabled={selected !== null}
                >
                  <span>
                    {question.type === "True/False"
                      ? ""
                      : String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="quiz-explanation">
              <strong>
                {selected === question.answer
                  ? "Correct answer!"
                  : "Not quite. Here's why:"}
              </strong>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className="quiz-bottom">
            <span>
              Score: {score}/{quizQuestions.length}
            </span>

            <button
              className="quiz-primary-btn"
              onClick={nextQuestion}
              disabled={selected === null}
            >
              {current === quizQuestions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </section>
      )}

      <section className="content-card quiz-learning-note">
        <h3>Adaptive Learning Cycle</h3>
        <p>
          Lecture Notes → Quiz Practice → Performance Analysis →
          Targeted Revision
        </p>
        <small>
          Question generation currently uses a sample question bank.
          AI-powered lecture-note generation will be integrated later.
        </small>
      </section>
    </>
  );
}

export default Quiz;
