import React from "react";
import { useQuery } from "react-query";

import blogService from "../services/blogs";

import Blog from "../components/Blog";

const Blogs = () => {
  const sortBlogs = (blogs) => {
    const blogsList = blogs.sort((a, b) => b.likes - a.likes);
    return blogsList.map((blog, index) => (
      <Blog
        key={blog.id}
        blog={blog}
        position={index + 1}
      />
    ));
  };

  const result = useQuery("blogs", blogService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdote service not available due problems in the server</div>;
  }

  const blogs = result.data;

  return (<div className="blogs-container">{sortBlogs(blogs)}</div>);
};

export default Blogs;
