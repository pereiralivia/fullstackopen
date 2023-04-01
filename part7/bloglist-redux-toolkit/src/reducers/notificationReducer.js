import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return action.payload;
    },
    removeNotification(state, action) {
      state = '';
      return state;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const showNotification = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
