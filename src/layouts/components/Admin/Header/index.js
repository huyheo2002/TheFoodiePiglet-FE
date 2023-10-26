import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  BellIcon,
  MessageIcon,
  UserIcon,
  MemuAltLeftIcon,
  MemuIcon,
  EarthIcon,
} from "../../../../components/Icons";
import {
  handleCloseSidebar,
  handleOpenSidebar,
} from "../../../../redux/actions/adminAction";
import { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import * as commonServices from "../../../../services/commonServices";
import { useTranslation } from "react-i18next";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["header"]);
  const toggleSidebar = useSelector((states) => states.admin.toggleSidebar);
  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");

  const listLanguages = ["languages-vi", "languages-en"];
  // decoded dataUser
  const [dataUserDecoded, setDataUserDecoded] = useState(null);

  const decoded = async () => {
    if (dataUser) {
      const respon = await commonServices.handleDecoded(dataUser.token);
      // console.log("respon.decoded", respon)
      if (respon && respon.errCode === 0) {
        setDataUserDecoded(respon.decoded);
      }
    }
  };

  useEffect(() => {
    decoded();
  }, [])

  useEffect(() => {
    if (dataUserDecoded && dataUserDecoded.user.roleName === "User") {
      navigate("/");
    }
  }, []);

  const handleToggleSidebar = () => {
    if (toggleSidebar === true) {
      dispatch(handleCloseSidebar());
    } else {
      dispatch(handleOpenSidebar());
    }
  };

  const changeLanguages = (lng = "vi" || "en" ) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={clsx(
        "bg-white h-16 mx-3 mt-2 px-4 fixed z-50 w-[calc(100%-300px-1.5rem)] flex justify-between items-center rounded-lg shadow-black-rb-0.35",
        {
          "!w-[calc(100%-1.5rem)]": toggleSidebar === false,
        }
      )}
    >
      <div className="flex items-center">
        <span
          className="group px-2 inline-block relative rounded-full hover:bg-[#e6f2fe] transition-all duration-300 cursor-pointer"
          onClick={() => handleToggleSidebar()}
        >
          {/* <MemuAltLeftIcon className="!w-10 !h-8 visible group-hover:invisible group-hover:opacity-0 transition-all duration-1000 absolute inset-0" /> */}
          <MemuIcon className="!w-8 !h-8 transition-all duration-300 group-hover:text-[#548be6]" />
        </span>
      </div>
      <div className="flex items-center h-full">
        <div className="mx-2 relative group h-full flex justify-center items-center">
          <EarthIcon className="!w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
          <div className="bg-white hidden shadow-black-rb-0.35 flex-col min-w-[14rem] z-50 absolute top-full left-0 rounded-b-lg overflow-hidden group-hover:flex">
            {listLanguages && listLanguages.map((item, index) => {
              let getStr = "vi";
              let convertToArray = item.split("-");
              if (convertToArray) {
                getStr = convertToArray[convertToArray.length - 1];
              }        

              return (
                <div key={index} className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                  onClick={() => changeLanguages(getStr)}
                >
                  {t(`nav-subItem.${item}`)}
                </div>
              )
            })}
          </div>
        </div>
        <MessageIcon className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
        <BellIcon className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
        <UserIcon className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
      </div>
    </div>
  );
}

export default Header;
