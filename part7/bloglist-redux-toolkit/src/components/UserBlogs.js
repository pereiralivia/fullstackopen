import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserBlogs = () => {
  const { id } = useParams();

  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) return null;

  return (
    <div className="w-full px-4 bg-white">
      <p className="text-3xl font-bold mb-4">{user.name}</p>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Blogs added:
      </h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
        {[...user.blogs].reverse().map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;

