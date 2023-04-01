import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    success: { color: 'green' },
    error: { color: 'red' },
  };

  if (!notification) return;

  return <p style={style[notification.type]}>{notification.message}</p>;
};

export default Notification;

