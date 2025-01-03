import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  BellIcon,
  MessageIcon,
  UserIcon,
  MemuIcon,
  EarthIcon,
} from "../../../../components/Icons";
import { handleLogoutRedux } from "../../../../redux/actions/userAction";
import {
  handleCloseSidebar,
  handleOpenSidebar,
} from "../../../../redux/actions/adminAction";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotificationCard from "../../../../components/NotificationCard";
import Image from "../../../../components/Image";
import * as notificationServices from "../../../../services/notificationServices";
import GlobalContext from "../../../../contexts/globalContext";
import Button from "../../../../components/Button";
import { useAuth } from "../../../../contexts/authContext";
import { TBUTTON_VARIANT } from "../../../../types/button";

function Header() {
  const navigate = useNavigate();
  const { reloadNotify } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["header"]);
  const toggleSidebar = useSelector((states) => states.admin.toggleSidebar);
  const [listNotify, setListNotify] = useState([]);
  const numberOfItemsToShow = 8;
  const visibleList =
    listNotify.length > 0 && listNotify.slice(0, numberOfItemsToShow);

  const listLanguages = ["languages-vi", "languages-en"];
  const { dataUser, setDataUser } = useAuth();
  useEffect(() => {
    handleGetAllNotify();
  }, []);

  useEffect(() => {
    handleGetAllNotify();
  }, [reloadNotify]);

  const handleGetAllNotify = async () => {
    const response = await notificationServices.handleGetAllNotification();
    if (response && response.errCode === 0) {
      setListNotify(response.notify);
    }
  };

  const handleToggleSidebar = () => {
    if (toggleSidebar === true) {
      dispatch(handleCloseSidebar());
    } else {
      dispatch(handleOpenSidebar());
    }
  };

  const changeLanguages = (lng = "vi" || "en") => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    // setDataUser(null);
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
          <MemuIcon className="!w-8 !h-8 transition-all duration-300 group-hover:text-[#548be6]" />
        </span>
      </div>
      <div className="flex items-center h-full">
        <div className="mx-2 relative group h-full flex justify-center items-center">
          <EarthIcon className="!w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
          <div className="bg-white hidden shadow-black-rb-0.35 flex-col min-w-[14rem] z-50 absolute top-full left-0 rounded-b-lg overflow-hidden group-hover:flex">
            {listLanguages &&
              listLanguages.map((item, index) => {
                let getStr = "vi";
                let convertToArray = item.split("-");
                if (convertToArray) {
                  getStr = convertToArray[convertToArray.length - 1];
                }

                return (
                  <div
                    key={index}
                    className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                    onClick={() => changeLanguages(getStr)}
                  >
                    {t(`nav-subItem.${item}`)}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mx-2 relative group h-full flex justify-center items-center">
          <MessageIcon className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
          <div className="select-none cursor-pointer absolute bottom-0 right-0 z-50 -translate-x-1/4 -translate-y-1/4 border-2 border-solid border-[#548be6] rounded-full w-6 h-6 font-medium text-sm flex justify-center items-center bg-[#e6f2fe] text-[#548be6]">
            15
          </div>
        </div>
        <div className="mx-2 relative group h-full flex justify-center items-center">
          <BellIcon
            className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300"
            onClick={() => navigate("/system/notify-detail")}
          />
          <div
            className={clsx(
              "bg-white hidden shadow-black-rb-0.35 flex-col w-[260px] z-50 absolute top-full left-0 rounded-b-lg overflow-hidden group-hover:flex max-h-[400px] overflow-y-scroll scrollbar",
              {
                "p-4": listNotify.length <= 0,
              }
            )}
          >
            {listNotify.length === 0 ? (
              <div className="flex flex-col">
                <Image src="" />
                <p className="font-bold text-center">Thông báo!</p>
                <p className="text-sm">Hiện bạn chưa có thông báo nào.</p>
              </div>
            ) : (
              <Fragment>
                {visibleList.length > 0 &&
                  visibleList.map((item, index) => {
                    return (
                      <NotificationCard
                        data={item}
                        key={index}
                        onClick={() => navigate("/system/notify-detail")}
                      />
                    );
                  })}

                {listNotify.length > numberOfItemsToShow && (
                  <div className="mx-3 mt-2 my-4">
                    <Button
                      variant={TBUTTON_VARIANT.PRIMARY}
                      onClick={() => {}}
                      to={"/system/notify-detail"}
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="mx-2 relative group h-full flex justify-center items-center">
          {dataUser && (
            <p className="text-base font-semibold">
              {t("userLogin.msgWelcome")} {dataUser.user.name}
            </p>
          )}
          <UserIcon className="mx-2 !w-10 !h-8 cursor-pointer text-[#4a4a4a] hover:text-[#548be6] transition-all duration-300" />
          <div className="bg-white hidden shadow-black-rb-0.35 flex-col min-w-[14rem] z-50 absolute top-full right-0 rounded-b-lg overflow-hidden group-hover:flex">
            <Link
              className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
              onClick={() => {}}
              to="/system/profile"
            >
              {t("nav-subItem.profile")}
            </Link>
            <Link
              className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
              onClick={() => handleLogout()}
              to={"/login"}
            >
              {t("nav-subItem.logout")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
