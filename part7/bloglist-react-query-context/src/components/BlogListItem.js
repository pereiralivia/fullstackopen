import { Link } from 'react-router-dom';

const BlogListItem = ({ blog }) => {
  return (
    <li>
      <Link
        to={`/blogs/${blog.id}`}
        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
      >
        <span className="flex-1 ml-3 whitespace-nowrap">
          {blog.title} {blog.author}
        </span>
      </Link>
    </li>
  );
};

export default BlogListItem;

