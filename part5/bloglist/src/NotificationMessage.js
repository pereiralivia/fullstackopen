import PropTypes from 'prop-types';

const NotificationMessage = ({ notificationMessage }) => {
  return (
    <p
      className={`notification ${
        notificationMessage.type === 'success'
          ? 'notification-success'
          : 'notification-error'
      }`}
    >
      {notificationMessage.message}
    </p>
  );
};

NotificationMessage.propTypes = {
  notificationMessage: PropTypes.object.isRequired,
};

export default NotificationMessage;

