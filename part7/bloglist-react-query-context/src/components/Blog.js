import { useParams, useNavigate } from 'react-router-dom';
import { useBlogsValue, useBlogsDispatch } from '../contexts/BlogsContext';
import { useNotification } from '../hooks';
import blogsService from '../services/blogs';
import { TrashIcon, LikeIcon } from './BlogIcons';
import Comments from './Comments';

const Blog = () => {
  const { id } = useParams();
  const blogs = useBlogsValue();
  const blog = blogs.find((blog) => blog.id === id);

  const dispatchBlogs = useBlogsDispatch();
  const navigate = useNavigate();
  const { handleNotification } = useNotification();

  const handleLike = async () => {
    try {
      const updatedBlog = await blogsService.updateBlog({
        ...blog,
        likes: blog.likes + 1,
      });

      dispatchBlogs({ type: 'MODIFY_BLOG', payload: updatedBlog });

      handleNotification({
        type: 'success',
        message: `blog ${blog.title} liked`,
      });
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  const handleDelete = async () => {
    try {
      await blogsService.deleteBlog(blog.id);

      dispatchBlogs({
        type: 'REMOVE_BLOG',
        payload: blog,
      });

      handleNotification({
        type: 'success',
        message: `blog ${blog.title} deleted`,
      });

      navigate('/');
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  if (!blog) return;

  return (
    <div className="mx-4 flex flex-col gap-6 max-w-lg p-6 bg-white rounded-lg shadow">
      <div className="flex">
        <div className="w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {blog.title}
          </h5>
          <p className="mb-1 font-normal text-gray-700">
            added by <span className="text-gray-500">{blog.author}</span>
          </p>
          <p className="flex items-center gap-1 font-normal text-gray-700">
            <button onClick={handleLike}>
              <LikeIcon />
            </button>
            {blog.likes}
          </p>
          <a
            href={blog.url}
            className="mt-4 inline-flex items-center text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </div>
      </div>
      <Comments />
      <button
        className="flex justify-end text-color-600"
        onClick={handleDelete}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default Blog;

