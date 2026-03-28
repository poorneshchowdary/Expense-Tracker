import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { ExpenseContext } from "./ExpenseContext";

function Navbar() {
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);
  const { logout, currentUser } = useContext(ExpenseContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Expense Tracker</h2>

      <div className="nav-links">
        <Link to="/">SignIn</Link>

        {currentUser && (
          <>
            <Link to="/add">Add</Link>
            <Link to="/list">List</Link>
          </>
        )}

        <button onClick={toggleTheme}>Toggle</button>

        {currentUser && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;