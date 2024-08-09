import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import { useSelector } from "react-redux";
import clsx from "clsx";
import GlobalContext from "../../contexts/globalContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import * as commonServices from "../../services/commonServices";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const toggleSidebar = useSelector((states) => states.admin.toggleSidebar);
  const { toggleDataTable, setToggleDataTable } = useContext(GlobalContext);
  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");

  const decoded = async () => {
    if (dataUser) {
      const respon = await commonServices.handleDecoded(dataUser.token);
      if (respon && respon.errCode === 0) {
        return respon.decoded;
      }
    }
  };

  useEffect(() => {
    if (!dataUser) {
      navigate("/");
    } else {
      decoded().then((infoUser) => {
        if (infoUser.user.roleName === "User") {
          navigate("/");
        }
      });
    }
  }, []);

  return (
    <div
      className="w-full relative"
      onClick={() => {
        if (toggleDataTable) {
          setToggleDataTable(false);
        }
      }}
    >
      <div className="relative flex">
        <div
          className={clsx("fixed inset-y-0 w-[300px] left-0 z-50 bg-white", {
            "!w-0": toggleSidebar === false,
          })}
        >
          <Sidebar />
        </div>
        <div
          className={clsx("w-full ml-[300px] relative", {
            "!ml-0": toggleSidebar === false,
          })}
        >
          <Header />
          <div className="mt-24">{children}</div>
        </div>
      </div>
      <div className="w-full h-[100vh] fixed inset-0 -z-10 bg-[#ebebeb]"></div>
    </div>
  );
};

export default AdminLayout;
