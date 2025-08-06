import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        {user ? (
          <>
            <Link className="nav-link" to="/logout">Logout</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
            <Link className="nav-link" to="/order-history">Order History</Link>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>

          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
