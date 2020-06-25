import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { children } = props;
  const { token, isAuth, user, loading, error } = state;

  //   load user

  // register user

  // login user

  //   logout

  // clear errors

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isAuth: isAuth,
        user: user,
        loading: loading,
        error: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
