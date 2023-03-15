import PropTypes from 'prop-types';
import { useState } from 'react';

const CreateBlogForm = ({ createBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  if (!showForm)
    return (
      <button id="new-blog-button" onClick={() => setShowForm(true)}>
        new blog
      </button>
    );

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => createBlog(e, newBlog)}>
        <div>
          <label>title:</label>
          <input
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleNewBlogChange}
            placeholder="title..."
            required
          />
        </div>
        <div>
          <label>author:</label>
          <input
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleNewBlogChange}
            placeholder="author..."
            required
          />
        </div>
        <div>
          <label>url:</label>
          <input
            id="url"
            name="url"
            value={newBlog.url}
            onChange={handleNewBlogChange}
            placeholder="url..."
            required
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
        <button type="button" onClick={() => setShowForm(false)}>
          cancel
        </button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  showNotificatioMessage: PropTypes.func.isRequired,
};

export default CreateBlogForm;

