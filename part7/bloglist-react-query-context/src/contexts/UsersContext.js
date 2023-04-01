import { createContext, useReducer, useContext } from 'react';

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
  }
};

const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [user, userDispatch] = useReducer(usersReducer, []);

  return (
    <UsersContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export const useUsersValue = () => {
  const usersAndDispatch = useContext(UsersContext);
  return usersAndDispatch[0];
};

export const useUsersDispatch = () => {
  const usersAndDispatch = useContext(UsersContext);
  return usersAndDispatch[1];
};

export default UsersContext;

