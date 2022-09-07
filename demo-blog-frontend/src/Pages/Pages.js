import React, { useContext } from "react";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NewPostPage from "./NewPostPage";
import PostPage from "./PostPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Pages = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {!authCtx.isLoggedIn && (
        <Route
          path="/login"
          element={
            <LoginPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          }
        ></Route>
      )}
      {!authCtx.isLoggedIn && (
        <Route
          path="/register"
          element={
            <RegisterPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          }
        ></Route>
      )}
      <Route
        path="/new-post"
        element={
          authCtx.isLoggedIn ? (
            <NewPostPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
      <Route
        path="/post/:id"
        element={
          <PostPage
            headerHeight={props.headerHeight}
            footerHeight={props.footerHeight}
          />
        }
      ></Route>
      <Route
        path="/"
        element={
          <MainPage
            headerHeight={props.headerHeight}
            footerHeight={props.footerHeight}
          />
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default Pages;
