import { useState } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext';

export const useInputField = (type) => {
  const [value, setValue] = useState('');
  const onChange = (e) => setValue(e.target.value);

  return {
    type,
    value,
    onChange,
  };
};

export const useNotification = () => {
  const dispatch = useNotificationDispatch();

  const handleNotification = (notification) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: notification,
    });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
    }, 5000);
  };

  return { handleNotification };
};

