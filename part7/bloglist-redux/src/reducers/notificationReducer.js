const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state = action.payload;
      return state;
    case 'REMOVE_NOTIFICATION':
      state = '';
      return state;
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notification,
  };
};

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' };
};

export default notificationReducer;
