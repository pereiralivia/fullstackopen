import { useEffect } from 'react';
import { useBlogsValue, useBlogsDispatch } from '../contexts/BlogsContext';
import blogsService from '../services/blogs';

import BlogListItem from './BlogListItem';

const BlogsList = () => {
  const blogs = useBlogsValue();
  const dispatchBlogs = useBlogsDispatch();

  useEffect(() => {
    (async () => {
      try {
        blogsService.setToken(
          JSON.parse(window.localStorage.getItem('blogListApp'))?.token
        );

        const blogs = await blogsService.getBlogs();

        dispatchBlogs({ type: 'SET_BLOGS', payload: blogs });
      } catch (e) {
        console.log(e.response.data.error);
      }
    })();
  }, [dispatchBlogs]);

  if (!blogs) return;

  return (
    <div className="w-full px-4 bg-white">
      <ul className="my-4 space-y-3">
        {blogs.reverse().map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default BlogsList;

