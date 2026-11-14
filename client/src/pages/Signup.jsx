
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  function handleSignup(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="auth-brand">
        <h1>STUDENTOS</h1>
        <div className="brand-content">
          <h2>Start Your Journey With Us.</h2>
          <p>
            Bring your academic life together in one place.
            Plan, learn, and achieve your goals.
          </p>
        </div>
        <div className="brand-footer">
          Your learning. Your progress. Your future.
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form">
          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Join STUDENTOS and organize your academic life.
          </p>

          <form onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />

            <label>University Email</label>
            <input type="email" placeholder="Enter your university email" required />

            <label>University</label>
            <input type="text" placeholder="Enter your university" required />

            <label>Department</label>
            <input type="text" placeholder="Enter your department" required />

            <label>Password</label>
            <input type="password" placeholder="Create a password" required minLength={8} />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required minLength={8} />

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
