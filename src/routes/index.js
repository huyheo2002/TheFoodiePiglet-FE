// layouts
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";
import DashBoard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";

// k đăng nhập sd đc
const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/login", component: Login, layout: null },
    { path: "/test", component: Test, layout: null },
    
    // system
    { path: "/system", component: DashBoard, layout: AdminLayout },
    { path: "/system/users", component: UserManagement, layout: AdminLayout },
]

// đăng nhập ms sd đc
const privateRoutes = [

]

export { publicRoutes, privateRoutes }