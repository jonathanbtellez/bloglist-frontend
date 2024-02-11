import { createContext, useContext, useReducer } from "react";

const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "GET":
      return state;
    default:
      return state;
  }
};

const UsersContext = createContext();

export const useUsersValue = () => {
  const usersDispatch = useContext(UsersContext);
  return usersDispatch[0];
};

export const useUsersDispatch = () => {
  const usersDispatch = useContext(UsersContext);
  return usersDispatch[1];
};

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(usersReducer);
  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
