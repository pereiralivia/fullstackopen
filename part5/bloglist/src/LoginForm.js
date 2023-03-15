import PropTypes from 'prop-types';
import { useState } from 'react';
import BlogsService from './services/blogs';

const LoginForm = ({ setUser, showNotificatioMessage }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });

  const handleUserCredentialsChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await BlogsService.login(userCredentials);
      setUser(user);
      BlogsService.setToken(user.token);
      window.localStorage.setItem('blogListUser', JSON.stringify(user));
      showNotificatioMessage('success', 'User logged in');
    } catch (e) {
      const errorMessage = e.response.data.error;
      showNotificatioMessage('error', errorMessage);
    }
  };

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userCredentials.username}
            onChange={handleUserCredentialsChange}
            required
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userCredentials.password}
            onChange={handleUserCredentialsChange}
            required
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotificatioMessage: PropTypes.func.isRequired,
};

export default LoginForm;

