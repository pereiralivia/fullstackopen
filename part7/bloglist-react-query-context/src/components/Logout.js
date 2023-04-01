import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../contexts/UserContext';

const Logout = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('blogListApp');
    dispatch({ type: 'REMOVE_USER' });
    navigate('/');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
    >
      Logout
    </button>
  );
};

export default Logout;

