import React from "react";
import { Link } from "react-router-dom";
import { useUsersDispatch } from "../context/UsersContext";

const User = ({ user, position }) => {
  const usersDispatch = useUsersDispatch();

  const setUserToShow = () => {
    usersDispatch({
      type: "SET",
      payload: user,
    });
  }
  return (
    <tr>
      <td className="table-body">{position}</td>
      <td className="table-body">{user.name}</td>
      <td className="table-body">{user.blogs.length}</td>
      <td className="table-body">
        <Link to={`/users/${user.id}`} onClick={setUserToShow}>Ver info</Link>
      </td>
    </tr>
  );
};

export default User;
