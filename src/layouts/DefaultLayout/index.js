import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// only header
const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full min-h-[1000px] relative overflow-hidden">
      <Header />
      {/* <Sidebar /> */}
      <div className="mx-16 relative">{children}</div>
    </div>
  );
};

export default DefaultLayout;
