import clsx from "clsx";
import logo from "../../../../assets/images/Base/logo-transparent.png";
import Image from "../../../../components/Image";
import Menu from "./Menu";
import { BoxFillIcon, DashboardIcon, HomeIcon, MessengerIcon, MoneyBillWaveIcon, NewsIcon, TableRestaurantIcon, UserCogIcon, UserIcon, UserShieldIcon, UsersIcon } from "../../../../components/Icons";
import { useSelector } from "react-redux";

const SIDEBAR_DATA = [
  {
    id: 1,
    title: "manageSystem",
    items: [
      {
        idItem: 1,
        to: "/system",
        name: "dashboard",
        icon: <DashboardIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 2,
        to: "/system/permissions-groups",
        name: "permissionGroup",
        keyword: "quan-ly-nhom-quyen",
        icon: <UsersIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 3,
        to: "/system/permissions",
        name: "permission",
        keyword: "quan-ly-quyen",
        icon: <UserCogIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 4,
        to: "/system/role",
        name: "role",
        keyword: "quan-ly-vai-tro",
        icon: <UserShieldIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 5,
        to: "/system/users",
        name: "users",
        keyword: "quan-ly-nguoi-dung",
        icon: <UserIcon className="!w-6 !h-6" />,
      }    
    ],
  },
  {
    id: 2,
    title: "manageContent",
    items: [      
      {
        idItem: 6,
        to: "/system/product",
        name: "products",
        keyword: "quan-ly-san-pham",
        icon: <BoxFillIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 7,
        to: "/system/news",
        keyword: "quan-ly-tin-tuc",
        name: "news",
        icon: <NewsIcon className="!w-6 !h-6" />,
      }
    ],
  },
  {
    id: 3,
    title: "app",
    items: [
      {
        idItem: 8,
        to: "/system/bill",
        name: "bill",
        keyword: "quan-ly-hoa-don",
        icon: <MoneyBillWaveIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 9,
        to: "/system/reserve-table",
        keyword: "quan-ly-dat-ban",
        name: "reserveTable",
        icon: <TableRestaurantIcon className="!w-6 !h-6" />,
      },
      {
        idItem: 10,
        to: "/system/chat-app",
        name: "chatApp",
        icon: <MessengerIcon className="!w-6 !h-6" />,
      },
    ],
  },
  {
    id: 3,
    title: "homePage",
    items: [
      {
        idItem: 11,
        to: "/",
        name: "homepages",
        icon: <HomeIcon className="!w-6 !h-6" />,
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
