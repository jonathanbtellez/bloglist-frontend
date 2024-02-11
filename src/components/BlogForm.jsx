import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useNotifyDispatch } from "../context/NotificationContext";
import blogService from "../services/blogs";

const BlogForm = () => {
  const queryClient = useQueryClient();

  const notifyDispatch = useNotifyDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const canSendForm = title === "" || author === "" || url === "";

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    try {
      newBlogMutation.mutate({ ...blog });
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: `The blog: ${blog.title} written by ${blog.author} was saved`,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (e) {
      console.error(e);
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: e.response.data.error,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
    }
  };
  return (
    <>
      <h3>Create a new blog</h3>
      <form onSubmit={handleSubmit} className="form--container">
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <br />
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <br />
          <input
            type="text"
            id="url"
            placeholder="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={canSendForm}
          className="button-success"
          style={{ marginBottom: ".5rem" }}
          id="createBottom"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
