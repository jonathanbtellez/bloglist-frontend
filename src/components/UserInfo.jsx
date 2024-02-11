import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import blogsService from "../services/blogs";
import { useUsersValue } from "../context/UsersContext";
import { useBlogsDispatch } from "../context/BlogContext";
import { useNotifyDispatch } from "../context/NotificationContext";

const UserInfo = () => {
  const navigate = useNavigate();

  const notifyDispatch = useNotifyDispatch();
  const userValue = useUsersValue();
  const blogDispacth = useBlogsDispatch();

  useEffect(() => {
    if (!userValue) {
      navigate("/users");
    }
  }, []);

  if (!userValue) {
    return (
      <div>
        <h2>User</h2>
        <hr />
        <h3>No information found</h3>
      </div>
    );
  }

  const getBlogMutation = useMutation(blogsService.getById, {
    onSuccess: (blog) => {
      blogDispacth({
        type: "SET",
        payload: blog,
      });
      navigate(`/blogs/${blog.id}`);
    },
  });

  const setBlogToShow = async (blog) => {
    try {
      getBlogMutation.mutate({ id: blog.id });
    } catch (error) {
      notifyDispatch({
        type: "SET",
        payload: {
          type: "error",
          text: error.response,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
    }
  };

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
                <button onClick={() => setBlogToShow(blog)} className="button-success">Ver info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
