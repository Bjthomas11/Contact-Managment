import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
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
  // const loadUser = () => console.log("load user");

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  // login user
  // const login = () => console.log("login user");

  //   logout
  // const logout = () => console.log("logout user");

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isAuth: isAuth,
        user: user,
        loading: loading,
        error: error,
        register,
        // loadUser,
        // login,
        // logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
