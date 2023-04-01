import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const initialState = '';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
    removeUser(state, action) {
      state = '';
      return state;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const getUser = () => {
  return (dispatch) => {
    const userFromLocalStorage = JSON.parse(
      window.localStorage.getItem('blogListApp')
    );
    dispatch(setUser(userFromLocalStorage));
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem('blogListApp', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (e) {
      console.log(e.response.data.error)
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('blogListApp');
    dispatch(removeUser());
  };
};

export default userSlice.reducer;

