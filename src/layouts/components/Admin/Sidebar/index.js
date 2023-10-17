import clsx from "clsx";
import logo from "../../../../assets/images/Base/logo-transparent.png";
import Image from "../../../../components/Image";
import Menu from "./Menu";
import { BoxFillIcon, DashboardIcon, MoneyBillWaveIcon, UserIcon } from "../../../../components/Icons";
import { useSelector } from "react-redux";

const SIDEBAR_DATA = [
  {
    id: 1,
    title: "manage",
    items: [
      {
        idItem: 1,
        to: "/system",
        name: "table",
        icon: <DashboardIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 2,
        to: "/system/users",
        name: "users",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 3,
        to: "/system/product",
        name: "products",
        icon: <BoxFillIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 4,
        to: "/system/cart",
        name: "cart",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 5,
        to: "/system/bill",
        name: "bill",
        icon: <MoneyBillWaveIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 2,
    title: "app",
    items: [
      {
        idItem: 9999999999999,
        to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 999999999998,
        to: "/system",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "statistical",
    items: [
      {
        idItem: 999999999997,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 99999999996,
        // to: "calendar",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "statistical",
    items: [
      {
        idItem: 91919196,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 14949497,
        // to: "calendar",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "statistical",
    items: [
      {
        idItem: 161616166,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 16168557,
        // to: "calendar",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "statistical",
    items: [
      {
        idItem: 161685586,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 15216857,
        // to: "calendar",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "statistical",
    items: [
      {
        idItem: 16168556,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 1313168867,
        // to: "calendar",
        name: "calendar",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
];

function Sidebar() {
  const toggleSidebar = useSelector(states => states.admin.toggleSidebar)

  return (
    <div className={clsx("flex flex-col pt-4 relative w-full", {
      "!hidden": toggleSidebar === false
    })}>
      {/* logo */}
      <div className="h-[20vh] absolute inset-x-0 top-0 z-20">
        {toggleSidebar && <Image src={logo} />}      
      </div>
      {/* menu */}
      <div className="h-[calc(80vh)] absolute inset-x-0 bottom-0 z-30 top-[20vh] py-4">
        <Menu data={SIDEBAR_DATA} />
      </div>
    </div>
  );
}

export default Sidebar;
