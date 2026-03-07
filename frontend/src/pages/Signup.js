import Navbar from "../components/Navbar";
import "../styles/login_about.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists. Please login.");
      navigate("/login");
      return;
    }

    // create new user
    const newUser = { name, email, password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Please login.");

    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={signup}>Create Account</button>

          <p className="login-note">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Signup;