import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import "./i18n";
import ContextWrapper from "./contexts/contextWrapper";
import { useSelector } from "react-redux";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // const dataUserRedux = useSelector((state) => state.user.user);
  // console.log("dataUserRedux app", dataUserRedux)
  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");
  console.log("dataUser", dataUser);
  return (
    <ContextWrapper>
      <Router>
        <div className="app">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              const Page = route.component;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              console.log("dataUserRedux.role", dataUser.role)
              console.log("route.role", route.role)

              if(dataUser.auth && dataUser.role === route.role) {
                let Layout = DefaultLayout;
                const Page = route.component;

                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }

                console.log("private route", route)
              
                console.log("AUTH TRUE")
                return (
                  <Route
                    path={route.path}
                    key={index}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              } else {
              
              }              
            })}            
          </Routes>
        </div>
      </Router>
    </ContextWrapper>
  );
}

export default App;
