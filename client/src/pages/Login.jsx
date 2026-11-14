
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="auth-brand">
        <h1>STUDENTOS</h1>
        <div className="brand-content">
          <h2>Your Academic Journey, Smarter.</h2>
          <p>
            Manage your courses, track your progress, and
            discover a smarter way to learn.
          </p>
        </div>
        <div className="brand-footer">
          Your learning. Your progress. Your future.
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form">
          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">
            Sign in to continue to your academic dashboard.
          </p>

          <form onSubmit={handleLogin}>
            <label>University Email</label>
            <input
              type="email"
              placeholder="Enter your university email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
