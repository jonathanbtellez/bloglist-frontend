import React from "react";
import { useUserDispatch, useUserValue } from "../context/UserContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const logout = () => {
    userDispatch({
      type: "SET",
      payload: null,
    });
    window.localStorage.removeItem("loggedBlogAppUser");
  };
  // const user = { name: "juan" };
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  return (
    <nav className="nav-container">
      <div className="nav-links">
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <p>{user.name} logged in</p>
      </div>
      {user && (
        <button onClick={logout} className="button-danger" id="logout">
          Log out
        </button>
      )}
    </nav>
  );
};

export default NavBar;
