import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "GET":
            return state
        default:
            return state
    }
}

const UserContext = createContext()

export const useUserValue = () => {
    const userDispatch = useContext(UserContext);
    return userDispatch[0];
};

export const useUserDispatch = () => {
    const userDispatch = useContext(UserContext);
    return userDispatch[1];
};

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer);
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;