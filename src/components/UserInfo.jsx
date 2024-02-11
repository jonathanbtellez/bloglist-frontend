import React from "react";

import { useUsersValue } from "../context/UsersContext";
import { Link, useParams } from "react-router-dom";

const UserInfo = () => {
  const user = useParams().id;
  const usersValue = useUsersValue();

  let userInfo = [];
  if (!usersValue) {
    return null
  }
  userInfo = usersValue.find((userDB) => userDB.id === user);
  if (!userInfo) {
    return (
      <div>
        <h2>User</h2>
        <hr />
        <h3>No information found</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>User</h2>
      <hr />
      <p>
        <b>Name: </b>
        {userInfo.name}
      </p>
      <h4>Added blogs: </h4>
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-head">Position</th>
            <th className="table-head">Name</th>
            <th className="table-head">Blogs</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.blogs.map((blog, index) => (
            <tr key={index}>
              <td className="table-body">{index + 1}</td>
              <td className="table-body">{blog.title}</td>
              <td className="table-body">{blog.likes}</td>
              <td className="table-body">
                <Link to={`/blogs/${blog.id}`}>Ver info</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
