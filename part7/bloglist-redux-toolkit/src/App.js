import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getUser } from './reducers/userReducer';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogsList from './components/BlogsList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import UserBlogs from './components/UserBlogs';

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      {user && (
        <div>
          <Navigation />
          <Header />
          <Notification />
        </div>
      )}

      <Routes>
        <Route path="/" element={user ? <BlogsList /> : <Login />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserBlogs />} />
      </Routes>
    </Router>
  );
};

export default App;

