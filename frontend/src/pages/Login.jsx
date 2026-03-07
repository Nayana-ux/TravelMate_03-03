import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/login_about.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Get users stored during signup
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    // If user not found
    if (!foundUser) {
      alert("User not found. Please sign up first.");
      return;
    }

    // Store logged in user
    localStorage.setItem("user", JSON.stringify(foundUser));
    localStorage.setItem("loggedIn", "true");

    navigate("/destinations");
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">

          <h2>Sign In</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Sign In</button>

          <p className="login-note">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>

        </div>
      </div>

    </>
  );
}

export default Login;