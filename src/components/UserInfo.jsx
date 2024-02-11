import React, { useEffect } from "react";

import { useUsersValue } from "../context/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import { useBlogsDispatch } from "../context/BlogContext";

const UserInfo = () => {
  const navigate = useNavigate();
  const userValue = useUsersValue();
  const blogDispacth = useBlogsDispatch();

  useEffect(() => {
    if(!userValue){navigate('/users')}
  },[]);

  if (!userValue) {
    return (
      <div>
        <h2>User</h2>
        <hr />
        <h3>No information found</h3>
      </div>
    );
  }

  const setBlogToShow = (blog) => {
    blogDispacth({
      type: "SET",
      payload: blog,
    });
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="nav-container">
        <h2>User</h2>
        <button className="button-danger" onClick={goBack}>
          Go back
        </button>
      </div>
      <hr />
      <p>
        <b>Name: </b>
        {userValue.name}
      </p>
      <h4>Added blogs: </h4>
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-head">Position</th>
            <th className="table-head">Name</th>
            <th className="table-head">Likes</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userValue.blogs.map((blog, index) => (
            <tr key={index}>
              <td className="table-body">{index + 1}</td>
              <td className="table-body">{blog.title}</td>
              <td className="table-body">{blog.likes}</td>
              <td className="table-body">
                <Link to={`/blogs/${blog.id}`} onClick={()=> setBlogToShow(blog)}>Ver info</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
