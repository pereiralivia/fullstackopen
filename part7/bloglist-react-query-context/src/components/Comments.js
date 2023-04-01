import { useParams } from 'react-router-dom';
import { useBlogsValue, useBlogsDispatch } from '../contexts/BlogsContext';
import { useInputField, useNotification } from '../hooks';
import blogsService from '../services/blogs';

const Comments = () => {
  const comment = useInputField('text');

  const { id } = useParams();
  const blogs = useBlogsValue();
  const blog = blogs.find((blog) => blog.id === id);

  const dispatchBlogs = useBlogsDispatch();
  const { handleNotification } = useNotification();

  const handleCreateComment = async () => {
    try {
      const blogWithComment = await blogsService.createComment(blog, {
        comment: comment.value,
      });

      dispatchBlogs({ type: 'MODIFY_BLOG', payload: blogWithComment });

      handleNotification({ type: 'success', message: `comment created` });
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  return (
    <div>
      <h2 className="py-4 block text-xl font-medium text-gray-900">Comments</h2>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        {...comment}
        placeholder="Leave a comment..."
      ></textarea>
      <button
        type="text"
        className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        onClick={() => handleCreateComment(blog, comment)}
      >
        Post a comment
      </button>
      {blog.comments.length > 0 && (
        <div className="w-full pb-4 bg-white">
          <ul className="my-4 space-y-3">
            {[...blog.comments].reverse().map((comment, index) => (
              <li key={index} className="text-sm text-gray-700 italic">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Comments;

