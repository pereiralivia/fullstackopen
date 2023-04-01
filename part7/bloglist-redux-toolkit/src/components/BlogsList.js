import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../reducers/blogsReducer';
import BlogListItem from './BlogListItem';

const BlogsList = () => {
  const blogs = useSelector((state) => [...state.blogs].reverse());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="w-full px-4 bg-white">
      <ul className="my-4 space-y-3">
        {blogs.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default BlogsList;

