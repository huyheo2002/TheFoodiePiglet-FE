// layouts
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import FullScreenLayout from "../layouts/FullScreenLayout";

// pages client
import Home from "../pages/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";
import Menu from "../pages/Menu";

// pages system
import DashBoard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import News from "../pages/News";

// k đăng nhập sd đc
const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/login", component: Login, layout: null },
    { path: "/menu", component: Menu, layout: FullScreenLayout },
    { path: "/test", component: Test, layout: null },
    { path: "/news", component: News, layout: DefaultLayout },
    // system
    { path: "/system", component: DashBoard, layout: AdminLayout },
    { path: "/system/users", component: UserManagement, layout: AdminLayout },
]

// đăng nhập ms sd đc
const privateRoutes = [

]

export { publicRoutes, privateRoutes }