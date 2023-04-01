import { useEffect } from 'react';
import { useUserValue, useUserDispatch } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Navigation from './components/Navigation';
import Header from './components/Header';
import BlogsList from './components/BlogsList';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Users from './components/Users';
import UserBlogs from './components/UserBlogs';

const App = () => {
  const user = useUserValue();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(
      window.localStorage.getItem('blogListApp')
    );
    dispatch({ type: 'SET_USER', payload: userFromLocalStorage });
  }, [dispatch]);

  return (
    <Router>
      <Notification />
      {user && (
        <div>
          <Navigation />
          <Header />
        </div>
      )}
      {user ? (
        <Routes>
          <Route path="/" element={user ? <BlogsList /> : <Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlogs />} />
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default App;

