import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

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
  const dispatch = useDispatch();

  const handleNotification = ({ type, message }) => {
    dispatch(setNotification({ type, message }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return handleNotification;
};

