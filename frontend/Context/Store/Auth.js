import React, { useEffect, useReducer, userEffect, useState } from "react";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SyncStorage from "sync-storage";
import authReducer from "../Reducers/AuthReducers";

import { setCurrentUser } from "../Actions/AuthActions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  // console.log(props.children)
  console.log(SyncStorage.get("jwt"));
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
    if (SyncStorage.jwt) {
      const decoded = SyncStorage.jwt ? SyncStorage.jwt : "";
      if (setShowChild) {
        dispatch(setCurrentUser(jwtDecode(decoded)));
      }
    }
    return () => setShowChild(false);
  }, []);
  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;
