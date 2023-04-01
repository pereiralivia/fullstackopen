import { useInputField } from '../hooks';
import { useNotification } from '../hooks';

import blogsService from '../services/blogs';

const BlogForm = () => {
  const title = useInputField('text');
  const author = useInputField('text');
  const url = useInputField('text');

  const handleNotification = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogsService.createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      });
      handleNotification({ type: 'success', message: `blog ${title.value} created` });
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      title: <input {...title} />
      author: <input {...author} />
      url: <input {...url} />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;

