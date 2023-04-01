import { useInputField } from '../hooks';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const BlogForm = () => {
  const title = useInputField('text');
  const author = useInputField('text');
  const url = useInputField('text');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createBlog({ title, author, url }));
  };

  return (
    <form className="mx-4 max-w-md" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Title:
        </label>
        <input
          {...title}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Author:
        </label>
        <input
          {...author}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Url:
        </label>
        <input
          {...url}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Create
      </button>
    </form>
  );
};

export default BlogForm;

