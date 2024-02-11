import { createContext, useContext, useReducer } from "react";

const blogsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "GET":
      return state;
    default:
      return state;
  }
};

const BlogsContext = createContext();

export const useBlogsValue = () => {
  const blogsDispatch = useContext(BlogsContext);
  return blogsDispatch[0];
};

export const useBlogsDispatch = () => {
  const blogsDispatch = useContext(BlogsContext);
  return blogsDispatch[1];
};

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer);
  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  );
};

export default BlogsContext;
