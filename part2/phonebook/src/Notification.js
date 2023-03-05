const Notification = ({ notificationMessage }) => {
  return (
    <p
      className={`${
        notificationMessage.type === 'success'
          ? 'notification-message-success'
          : 'notification-message-error'
      }`}
    >
      {notificationMessage.message}
    </p>
  );
};

export default Notification;
