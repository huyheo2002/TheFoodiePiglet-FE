import clsx from "clsx";
import logo from "../../../../assets/images/Base/logo-transparent.png";
import Image from "../../../../components/Image";
import Menu from "./Menu";
import { BellIcon, EarthIcon, UserIcon } from "../../../../components/Icons";
import { useSelector } from "react-redux";

const SIDEBAR_DATA = [
  {
    id: 1,
    title: "manage",
    items: [
      {
        idItem: 1,
        to: "table",
        name: "table",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 2,
        to: "users",
        name: "users",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 3,
        to: "personal",
        name: "personal",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 2,
    title: "app",
    items: [
      {
        idItem: 4,
        to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 5,
        to: "calendar",
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
        idItem: 6,
        // to: "/",
        name: "homepages",
        icon: <UserIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 7,
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
      {toggleSidebar && <Image src={logo} />}      
      {/* menu */}
      <Menu data={SIDEBAR_DATA} />
    </div>
  );
}

export default Sidebar;
