import { Link } from "react-router-dom";
import Menu from "./Menu";
import { BellIcon, EarthIcon, LineDownIcon, UserIcon } from "../../../components/Icons";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import GlobalContext from "../../../contexts/globalContext";

const NAVBAR_ITEM = [
  {
    icon: null,
    keyword: "home",
    onlyShowIcon: false,
    to: "/",
  },
  {
    icon: null,
    keyword: "news",
    onlyShowIcon: false,
    to: "/news",
  },
  {
    icon: null,
    keyword: "menu",
    onlyShowIcon: false,
    to: "/menu",
  },
  {
    icon: null,
    keyword: "order-online",
    onlyShowIcon: false,
    to: "/order",
  },
  {
    icon: <LineDownIcon className="!w-4 !h-4" />,
    keyword: "media",
    onlyShowIcon: false,
    to: "/",
    subNav: [
      {
        keyword: "introduce",
        to: "/",
      },
      {
        keyword: "store",
        to: "/",
      },
      {
        keyword: "about-us",
        to: "/",
      }
    ],
  },
];

const NAVBAR_RIGHT_ITEM = [
  {
    icon: <BellIcon className="!w-6 !h-6" />,
    keyword: "notify",
    // to: "/news",
    onlyShowIcon: true,
  },
  {
    icon: <EarthIcon className="!w-6 !h-6 cursor-pointer" />,
    keyword: "languages",
    // to: "/",
    onlyShowIcon: true,
    subNav: [
      {
        keyword: "languages-vi",
        // to: "/",
      },
      {
        keyword: "languages-en",
        // to: "/",
      },
    ],
  },
  {
    icon: <UserIcon className="!w-6 !h-6" />,
    keyword: "login",
    onlyShowIcon: false,
    to: "/login",
  },
];

function Header() {
  const { testContext } = useContext(GlobalContext);
  console.log("testContext", testContext);

  return (
    <header className="w-full h-16 shadow-bs-black-b-0.35 bg-rgba-black-0.75 flex justify-between px-8 fixed z-50 top-0 left-0 right-0">
      {/* left */}
      <div className="max-h-16 flex">
        {/* logo */}
        <Link to="" className="max-h-16 flex items-center">
          <img
            src="https://i.pinimg.com/originals/81/1d/31/811d318205e944641a3139dcaebdaa2a.png"
            className="h-full w-10 py-4 select-none"
          />
          <p className="text-white uppercase text-2xl pl-3 font-semibold">
            The Foodie Piglet
            {/* {t("Home")} */}
          </p>
        </Link>
        {/* navbar */}
        <Menu data={NAVBAR_ITEM} />
      </div>
      {/* right */}
      <div className="flex items-center h-full">
        <Menu data={NAVBAR_RIGHT_ITEM} />
        {/* Thông báo */}
        {/* <Link
          to=""
          className="text-gray-200 hover:text-white text-[16px] capitalize px-3 h-full leading-[4rem] flex items-center"
        >
          <BellIcon className="!w-8 !h-8" />
        </Link>
        <Link
          to=""
          className="text-gray-200 hover:text-white text-[16px] capitalize px-3 h-full leading-[4rem]"
        >
          Đăng nhập
        </Link> */}
      </div>
    </header>
  );
}

export default Header;
