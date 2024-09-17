import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import "./i18n";
import ContextWrapper from "./contexts/contextWrapper";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext";
import { MenuSelectedProvider } from "./contexts/menuSelectedContext";

function App() {
  return (
    <AuthProvider>
      <MenuSelectedProvider>
        <ContextWrapper>
          <Router>
            <div className="app">
              <Routes>
                {privateRoutes.map((route, index) => {
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
          <Toaster position="top-right" reverseOrder={false} toastOptions={{
            style: { zIndex: 10000 }
          }} />
        </ContextWrapper>
      </MenuSelectedProvider>
    </AuthProvider>
  );
}

export default App;
