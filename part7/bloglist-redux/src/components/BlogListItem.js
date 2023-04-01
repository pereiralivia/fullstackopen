import { useNotification } from '../hooks';
import blogsService from '../services/blogs';

const BlogListItem = ({ blog }) => {
  const handleNotification = useNotification();

  const handleVote = async () => {
    try {
      await blogsService.updateBlog({ ...blog, likes: blog.likes + 1 });
      handleNotification({
        type: 'success',
        message: `blog ${blog.title} voted`,
      });
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  const handleDelete = async () => {
    try {
      await blogsService.deleteBlog(blog.id);
      handleNotification({
        type: 'success',
        message: `blog ${blog.title} deleted`,
      });
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  return (
    <div>
      {blog.title} {blog.author} likes {blog.likes}
      <button onClick={handleVote}>like</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default BlogListItem;

