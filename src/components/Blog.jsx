import { useState } from "react";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { useNotifyDispatch } from "../context/NotificationContext";

const Blog = ({ blog, position }) => {
  const queryClient = useQueryClient();

  const notifyDispatch = useNotifyDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const updateBlogMutation = useMutation(blogsService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlogMutation = useMutation(blogsService.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const handleLike = () => {
    const blogUpdate = {
      ...blog,
    };

    blogUpdate.likes++;
    try {
      updateBlogMutation.mutate({ ...blogUpdate });
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: `You give a like to the blog ${blog.title}`,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
      blog.likes++
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

  const handleDelete = () => {
    try {
      deleteBlogMutation.mutate({ ...blog });
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: `The blog ${blog.title} has been deleted`,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
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

  const canShowContent = (isVisible) => {
    if (isVisible) {
      return (
        <div className="blog-title-container">
          <div>
            <p>
              <b>URL: </b>
              {blog.url}
            </p>
            <p>
              <b>Likes: </b>
              {blog.likes}
            </p>
            <p>
              <b>Author: </b>
              {blog.author}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: ".5rem",
              flexDirection: "column",
            }}
          >
            <button className="button-success" onClick={handleLike} id="like">
              Like
            </button>
            <button
              className="button-danger"
              onClick={handleDelete}
              id="delete"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="blog-container">
      <div className="blog-title-container">
        <h4 style={{ margin: "0px" }}>{`${position} - ${blog.title}`}</h4>{" "}
        <button
          className="button-info"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          id="isBlogVisible"
        >
          {isVisible ? "hide" : "show"}
        </button>
      </div>
      {canShowContent(isVisible)}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
};
export default Blog;
