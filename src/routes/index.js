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

// k đăng nhập sd đc
const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/login", component: Login, layout: null },
    { path: "/menu", component: Menu, layout: FullScreenLayout },
    // { path: "/test", component: Test, layout: null },    
]

// đăng nhập ms sd đc
const privateRoutes = [
    // system 
    // role admin 1
    { path: "/system", component: DashBoard, layout: AdminLayout, role: 1 },
    { path: "/system/users", component: UserManagement, layout: AdminLayout, role: 1 },

    // role user 4
    { path: "/test", component: Test, layout: null, role: 4 },    

]

export { publicRoutes, privateRoutes }