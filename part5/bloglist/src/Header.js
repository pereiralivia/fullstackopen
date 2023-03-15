import PropTypes from 'prop-types';

const Header = ({ user, setUser, showNotificatioMessage }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser');
    setUser('');
    showNotificatioMessage('success', 'User logged out');
  };
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  showNotificatioMessage: PropTypes.func.isRequired
};

export default Header;

