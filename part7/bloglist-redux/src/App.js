import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from './reducers/userReducer';

import Login from './components/Login';
import Logout from './components/Logout';
import BlogsList from './components/BlogsList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(
      window.localStorage.getItem('blogListApp')
    );
    dispatch(setUser(userFromLocalStorage));
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div>
          <Notification />
          <Logout />
          <BlogForm />
          <BlogsList />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;

