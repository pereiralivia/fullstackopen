const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER':
      state = action.payload;
      return state;
    case 'REMOVE_USER':
      state = '';
      return state;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const removeUser = () => {
  return { type: 'REMOVE_USER' };
};

export default userReducer;

