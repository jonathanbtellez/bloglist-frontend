import React from "react";

const User = ({ user, position }) => {
  return (
    <tr>
        <td>{position}</td>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
    </tr>
  );
};

export default User;
