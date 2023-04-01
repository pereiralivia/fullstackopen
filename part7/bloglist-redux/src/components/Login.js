import { useDispatch } from 'react-redux';
import { useInputField, useNotification } from '../hooks/index';
import { setUser } from '../reducers/userReducer';

import loginService from '../services/login';

const Login = () => {
  const username = useInputField('text');
  const password = useInputField('password');

  const dispatch = useDispatch();
  const handleNotification = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem('blogListApp', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (e) {
      handleNotification({ type: 'error', message: e.response.data.error });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      username: <input {...username} />
      password: <input {...password} />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;

