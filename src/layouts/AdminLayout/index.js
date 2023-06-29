import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import { useSelector } from "react-redux";
import clsx from "clsx";

// only header
const AdminLayout = ({ children }) => {
  const toggleSidebar = useSelector(states => states.admin.toggleSidebar)
  return (
    <div className="w-full relative">
      <div className="relative flex">
        <div className={clsx("fixed inset-y-0 w-1/5 left-0 z-50 bg-white", {
          "!w-0": toggleSidebar === false
        })}>
          <Sidebar/>
        </div>
        <div className={clsx("w-full ml-[20%] relative", {
          "!ml-0": toggleSidebar === false
        })}>
          <Header/>
          <div className="mt-24">{children}</div>
        </div>
      </div>
      <div className="w-full h-[100vh] fixed inset-0 -z-10 bg-[#ebebeb]"></div>
    </div>
  );
};

export default AdminLayout;
