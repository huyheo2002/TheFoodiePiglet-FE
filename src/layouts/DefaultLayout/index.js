import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import bg from "../../assets/images/Base/background.png";

// only header
const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full min-h-[1000px] relative overflow-hidden">
      <Header />
      {/* <Sidebar /> */}
      <div className="mx-16 relative">{children}</div>
      <div
        className="w-full h-[100vh] fixed inset-0 -z-10"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default DefaultLayout;
