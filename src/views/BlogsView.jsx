import React, { useRef } from "react";

import Blogs from "../components/Blogs";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const BlogsView = () => {
  const togglableBlogForm = useRef();

  return (
    <>
      <Blogs />

      <Togglable buttonLabel="Create blog" ref={togglableBlogForm}>
        <BlogForm />
      </Togglable>
    </>
  );
};

export default BlogsView;
