import React from "react";
import { Link } from "react-router-dom";

const User = ({ user, position }) => {
  return (
    <tr>
      <td className="table-body">{position}</td>
      <td className="table-body">{user.name}</td>
      <td className="table-body">{user.blogs.length}</td>
      <td className="table-body">
        <Link to={`/users/${user.id}`}>Ver info</Link>
      </td>
    </tr>
  );
};

export default User;
