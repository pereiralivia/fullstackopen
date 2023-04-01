import { createContext, useReducer, useContext } from 'react';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload;
    case 'APPEND_BLOG':
      return [...state, action.payload];
    case 'MODIFY_BLOG':
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.payload.id);
    default:
      return state;
  }
};

const BlogsContext = createContext();

export const BlogsContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(blogsReducer, []);

  return (
    <BlogsContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  );
};

export const useBlogsValue = () => {
  const userAndDispatch = useContext(BlogsContext);
  return userAndDispatch[0];
};

export const useBlogsDispatch = () => {
  const userAndDispatch = useContext(BlogsContext);
  return userAndDispatch[1];
};

export default BlogsContext;

