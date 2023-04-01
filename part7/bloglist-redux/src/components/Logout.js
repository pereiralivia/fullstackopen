import { useDispatch } from 'react-redux';
import { removeUser } from '../reducers/userReducer';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem('blogListApp');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

