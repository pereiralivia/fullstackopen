import { useEffect, useState } from 'react';
import BlogsService from './services/blogs';
import './App.css';
import CreateBlogForm from './CreateBlogForm';
import LoginForm from './LoginForm';
import BlogsList from './BlogsList';
import Header from './Header';
import NotificationMessage from './NotificationMessage';

const App = () => {
  const [user, setUser] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const showNotificatioMessage = (type, message) => {
    setNotificationMessage({ type, message });

    setTimeout(() => {
      setNotificationMessage(null);
    }, 1500);
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('blogListUser'));

    if (!user) return;

    setUser(user);
    BlogsService.setToken(user.token);
  }, []);

  useEffect(() => {
    if (!user) return;

    try {
      (async () => {
        const blogs = await BlogsService.getBlogs();
        setBlogs(blogs);
      })();
    } catch (e) {
      const errorMessage = e.response.data.error;

      showNotificatioMessage('error', errorMessage);
    }
  }, [user]);

  const createBlog = async (e, newBlog) => {
    e.preventDefault();

    try {
      const blogCreated = await BlogsService.createBlog(newBlog);
      showNotificatioMessage(
        'success',
        `a new blog ${blogCreated.title} by ${blogCreated.author} added`
      );

      const blogs = await BlogsService.getBlogs();
      setBlogs(blogs);
    } catch (e) {
      showNotificatioMessage('error', e.message);
    }
  };

  const deleteBlog = async (blog) => {
    const isConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (!isConfirmed) return;

    try {
      await BlogsService.deleteBlog(blog.id);

      const blogs = await BlogsService.getBlogs();
      setBlogs(blogs);
    } catch (e) {
      showNotificatioMessage('error', e.message);
    }
  };

  const incrementLike = async (blog) => {
    try {
      await BlogsService.updateBlog(
        { ...blog, likes: (blog.likes += 1) },
        blog.id
      );

      const blogs = await BlogsService.getBlogs();
      setBlogs(blogs);
    } catch (e) {
      showNotificatioMessage('error', e.message);
    }
  };

  return (
    <div>
      {notificationMessage && (
        <NotificationMessage notificationMessage={notificationMessage} />
      )}
      {user ? (
        <div>
          <Header
            user={user}
            setUser={setUser}
            showNotificatioMessage={showNotificatioMessage}
          />
          <CreateBlogForm
            createBlog={createBlog}
            showNotificatioMessage={showNotificatioMessage}
            setBlogs={setBlogs}
          />
          <BlogsList
            user={user}
            blogs={blogs}
            incrementLike={incrementLike}
            deleteBlog={deleteBlog}
          />
        </div>
      ) : (
        <LoginForm
          setUser={setUser}
          showNotificatioMessage={showNotificatioMessage}
        />
      )}
    </div>
  );
};

export default App;

