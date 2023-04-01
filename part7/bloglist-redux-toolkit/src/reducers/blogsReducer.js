import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';
import blogsService from '../services/blogs';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    modifyBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, modifyBlog, removeBlog } =
  blogsSlice.actions;

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      blogsService.setToken(
        JSON.parse(window.localStorage.getItem('blogListApp'))?.token
      );

      const blogs = await blogsService.getBlogs();
      dispatch(setBlogs(blogs));
    } catch (e) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.error })
      );
    }
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogsService.createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      });
      dispatch(appendBlog(createdBlog));
      dispatch(
        showNotification({
          type: 'success',
          message: `blog ${title.value} created`,
        })
      );
    } catch (e) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.error })
      );
    }
  };
};

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const blogWithComment = await blogsService.createComment(blog, {
        comment: comment.value,
      });

      dispatch(modifyBlog(blogWithComment));
      dispatch(
        showNotification({
          type: 'success',
          message: `comment created`,
        })
      );
    } catch (e) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.error })
      );
    }
  };
};

export const voteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.updateBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(modifyBlog(updatedBlog));
      dispatch(
        showNotification({
          type: 'success',
          message: `blog ${blog.title} voted`,
        })
      );
    } catch (e) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.error })
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blog.id);
      dispatch(
        showNotification({
          type: 'success',
          message: `blog ${blog.title} deleted`,
        })
      );
      dispatch(removeBlog(blog));
    } catch (e) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.error })
      );
    }
  };
};

export default blogsSlice.reducer;

