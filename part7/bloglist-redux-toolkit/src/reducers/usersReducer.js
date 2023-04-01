import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers, setUser } = usersSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getUsers();
      dispatch(setUsers(users));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await usersService.getUser(id);
      dispatch(setUser(user));
    } catch (e) {
      console.log(e);
    }
  };
};

export default usersSlice.reducer;

