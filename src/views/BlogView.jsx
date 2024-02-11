import { useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import { useBlogsValue } from "../context/BlogContext";
import { useEffect } from "react";

const BlogView = () => {
  const blogValue = useBlogsValue();
  const navigate = useNavigate();

  useEffect(() => {
    if(!blogValue){navigate('/')}
  },[]);

  if (!blogValue) {
    return (
      <div>
        <h2>Blog</h2>
        <hr />
        <h3>No information found</h3>
      </div>
    );
  }
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="nav-container">
        <h2>Blog</h2>
        <button className="button-danger" onClick={goBack}>
          Go back
        </button>
      </div>
      <Blog blog={blogValue} position={1}/>
    </>
  );
};

export default BlogView;
