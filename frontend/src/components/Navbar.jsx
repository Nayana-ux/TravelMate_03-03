import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const loggedIn = localStorage.getItem("loggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return loggedIn && storedUser ? storedUser : null;
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromStorage());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">TravelMate</div>

      <div className="nav-links">

        <Link to="/" className="nav-item">Home</Link>
        <Link to="/destinations" className="nav-item">Destinations</Link>
        <Link to="/about" className="nav-item">About</Link>

        {!user ? (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="nav-item">👤 {user.email}</span>

            <button onClick={handleLogout} className="nav-item logout-btn">
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;