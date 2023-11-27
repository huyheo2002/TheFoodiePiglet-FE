import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import "./i18n";
import ContextWrapper from "./contexts/contextWrapper";
// import { useSelector } from "react-redux";
import useLocalStorage from "./hooks/useLocalStorage";
import * as commonServices from "./services/commonServices";
import io from "socket.io-client";

// const socket = io(process.env?.REACT_APP_BACKEND_URL);

function App() {
  // test connect socket
  // socket.on("connect", () => {
  //   console.log("Connected to the server!");
  // });
  
  // const dataUserRedux = useSelector((state) => state.user.user);
  // console.log("dataUserRedux app", dataUserRedux)
  // const [dataUser, setDataUser] = useLocalStorage("dataUser", "");
  // // console.log("dataUser app", dataUser);
  // const [dataUserDecoded, setDataUserDecoded] = useState(null);

  // const decoded = async () => {
  //   if (dataUser) {
  //     const respon = await commonServices.handleDecoded(dataUser.token);
  //     // console.log("respon.decoded", respon)
  //     if (respon && respon.errCode === 0) {
  //       setDataUserDecoded(respon.decoded);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   decoded();
  // }, [dataUser])

  // console.log("dataUser app.js", dataUser);  

  // socket.on("disconnect", () => {
  //   console.log("Disconnected from the server!");
  // });


  return (
    <ContextWrapper>
      <Router>
        <div className="app">
          <Routes>
            {privateRoutes.map((route, index) => {
              // if (dataUserDecoded) {
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
              // }
            })}

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
          </Routes>
        </div>
      </Router>
    </ContextWrapper>
  );
}

export default App;
