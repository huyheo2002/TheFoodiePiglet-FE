import { Link } from "react-router-dom";
import Menu from "./Menu";
import {
  BellIcon,
  CartIcon,
  EarthIcon,
  LineDownIcon,
  UserIcon,
} from "../../../components/Icons";
import logo from "../../../assets/images/Base/logo-transparent.png";
import Image from "../../../components/Image";
import { useAuth } from "../../../contexts/authContext";

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
    keyword: "order",
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
        to: "/introduce",
      },
      {
        keyword: "store",
        to: "/store",
      },
      {
        keyword: "about-us",
        to: "/about-us",
      },
    ],
  },
];

const NAVBAR_RIGHT_ITEM = [
  {
    icon: <CartIcon className="!w-6 !h-6" />,
    keyword: "cart",
    to: "/cart",
    onlyShowIcon: true,
  },
  {
    icon: <BellIcon className="!w-6 !h-6" />,
    keyword: "notify",
    onlyShowIcon: true,
    customDropdown: true,
  },
  {
    icon: <EarthIcon className="!w-6 !h-6 cursor-pointer" />,
    keyword: "languages",
    onlyShowIcon: true,
    subNav: [
      {
        keyword: "languages-vi",
      },
      {
        keyword: "languages-en",
      },
    ],
  },
  {
    icon: <UserIcon className="!w-6 !h-6" />,
    keyword: "login",
    onlyShowIcon: false,
    to: "/login",
    subNav: [
      {
        keyword: "manager",
        to: "/system",
      },
      {
        keyword: "profile",
        to: "/profile",
      },
      {
        keyword: "logout",
        to: "/login",
      },
    ],
  },
];

function Header() {
  const { dataUser } = useAuth();

  return (
    <header className="w-full h-16 shadow-bs-black-b-0.35 bg-rgba-black-0.75 flex justify-between px-8 fixed z-[9999] top-0 left-0 right-0">
      <div className="max-h-16 flex">
        <Link to="" className="max-h-16 inline-block h-full">
          <Image src={logo} className="h-full" />
        </Link>
        <Menu data={NAVBAR_ITEM} />
      </div>
      <div className="flex items-center h-full">
        <Menu data={NAVBAR_RIGHT_ITEM} userLogin={dataUser ? dataUser : null} />
      </div>
    </header>
  );
}

export default Header;
