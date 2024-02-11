import { useState } from "react";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { useNotifyDispatch } from "../context/NotificationContext";
import { useBlogsDispatch } from "../context/BlogContext";
import blogs from "../services/blogs";

const Blog = ({ blog, position }) => {
  const queryClient = useQueryClient();

  const notifyDispatch = useNotifyDispatch();
  const blogDispacth = useBlogsDispatch();


  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState("");

  const updateBlogMutation = useMutation(blogsService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const commentBlogMutation = useMutation(blogsService.createComment, {
    onSuccess: async (blog) => {
      blogDispacth({
        type: "SET",
        payload: blog,
      });
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
      blog.likes++;
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

  const handleComment = async () => {
    try {
      await commentBlogMutation.mutate({ id: blog.id, content: content });
      setContent('')
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: `The blog ${blog.title} has been commented`,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
    } catch (error) {
      console.log(error.response.data.error)
      notifyDispatch({
        type: "SET",
        payload: {
          type: "error",
          text: error.response.data.error,
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
        <>
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
              <div>
                <b>Comments: </b>
                <ul>
                {blog.comments && blog.comments.map((comment, index) => (
                  <li key={index}>{comment.content}</li>
                ))}
                </ul>
              </div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: ".5rem",
            }}
          >
            <label htmlFor="comment">Comment</label>
            <input
              id="comment"
              type="text"
              className="input"
              placeholder="Put your comments here"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <button
              style={{
                width: "80px",
              }}
              className="button-success"
              disabled={content === "" ? true : false}
              onClick={handleComment}
            >
              Send
            </button>
          </div>
        </>
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
