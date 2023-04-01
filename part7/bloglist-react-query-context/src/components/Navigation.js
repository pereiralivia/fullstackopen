import { Link, useLocation } from 'react-router-dom';
import User from './User';
import Logout from './Logout';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li
              className={
                location.pathname === '/' ||
                location.pathname.startsWith('/blogs')
                  ? 'font-bold && text-blue-700'
                  : undefined
              }
            >
              <Link to="/">Blogs</Link>
            </li>
            <li
              className={
                location.pathname.startsWith('/users')
                  ? 'font-bold && text-blue-700'
                  : undefined
              }
            >
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-3 items-center">
          <User />
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

