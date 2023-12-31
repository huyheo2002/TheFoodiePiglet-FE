import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  // const dataUserRedux = useSelector((state) => state.user.user);
  // console.log("dataUserRedux app", dataUserRedux)
  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");
  // console.log("dataUser app", dataUser);
  const [dataUserDecoded, setDataUserDecoded] = useState(null);

  const decoded = async () => {
    if (dataUser) {
      const respon = await commonServices.handleDecoded(dataUser.token);
      // console.log("respon.decoded", respon)
      if (respon && respon.errCode === 0) {
        return respon.decoded;
      }
    }

    return null;
  };

  const expiresInToTimestamp = (expiresIn) => {
    const unit = expiresIn.charAt(expiresIn.length - 1);
    const value = parseInt(expiresIn.slice(0, -1), 10);
  
    let multiplier;
    switch (unit) {
      case 's':
        multiplier = 1;
        break;
      case 'm':
        multiplier = 60;
        break;
      case 'h':
        multiplier = 60 * 60;
        break;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  
    return value * multiplier;
  };

  const checkTokenExpiration = async (dataUserDecoded) => {
    if (dataUserDecoded && dataUserDecoded.expiresIn) {
      // test expirationTimestamp
      // const expirationTimestamp = expiresInToTimestamp(dataUserDecoded.expiresIn);
      // const expirationTimestamp = expiresInToTimestamp("10s");      
      const currentTimestamp = Math.floor(Date.now() / 1000);


      const iat = dataUserDecoded.iat;
      const expiresIn = expiresInToTimestamp(dataUserDecoded.expiresIn);
      // const expiresIn = expiresInToTimestamp("10s");

      // Tính toán thời điểm hết hạn
      const expirationTimestamp = await iat + parseInt(expiresIn, 10);

      // Kiểm tra xem token có hết hạn hay không
      if (currentTimestamp > expirationTimestamp) {
        console.log('Token has expired.');
      } else {
        console.log('Token is still valid.');
      }      

      if (currentTimestamp > expirationTimestamp) {
        localStorage.removeItem("dataUser");
        console.log('Token has expired. Removed from state and localStorage.');
        return <Navigate to="/" />;
      }

      console.log("go checkTokenExpiration");
    }
  };

  useEffect(() => {
    decoded().then(async result => {
      console.log("result", result);
      await checkTokenExpiration(result);
    });
  }, [])

  // console.log("dataUser app.js", dataUser);  

  // test connect socket
  // socket.on("connect", () => {
  //   console.log("Connected to the server!");
  // });

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
