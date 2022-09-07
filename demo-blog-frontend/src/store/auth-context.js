import React, { useState } from "react";

const AuthContext = React.createContext({
  userName: "",
  authorities: "",
  token: "",
  isLoggedIn: false,
  login: (loginResponse) => {},
  logout: () => {},
  ROLES: {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));
  const [authorities, setAuthorities] = useState(
    sessionStorage.getItem("authorities")
  );

  const userIsLoggedIn = !!token;

  const loginHandler = ({ userName, authorities, jwt }) => {
    setUserName(userName);
    setAuthorities(authorities);
    setToken(jwt);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("authorities", authorities);
    sessionStorage.setItem("token", jwt);
  };

  const logoutHandler = () => {
    setUserName(null);
    setAuthorities(null);
    setToken(null);
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("authorities");
    sessionStorage.removeItem("token");
  };

  const contextValue = {
    userName: userName,
    authorities: authorities,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    ROLES: {
      admin: "ROLE_ADMIN",
      user: "ROLE_USER",
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
