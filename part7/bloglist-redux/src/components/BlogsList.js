import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../hooks';


import { setBlogs } from '../reducers/blogsReducer';
import blogsService from '../services/blogs';
import BlogListItem from './BlogListItem';

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const handleNotification = useNotification();

  useEffect(() => {
    (async () => {
      blogsService.setToken(
        JSON.parse(window.localStorage.getItem('blogListApp'))?.token
      );

      try {
        const blogs = await blogsService.getBlogs();
        dispatch(setBlogs(blogs));
      } catch (e) {
        handleNotification({ type: 'error', message: e.response.data.error });
      }
    })();
  }, [dispatch, handleNotification]);

  return (
    <ul>
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogsList;

