// layouts
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import FullScreenLayout from "../layouts/FullScreenLayout";

// pages client
import Home from "../pages/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";
import Menu from "../pages/Menu";
import LoginSuccess from "../pages/Login/LoginSuccess";
import Error from "../pages/Error";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import News from "../pages/News";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";

// pages system
import DashBoard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import ProductManagement from "../pages/Admin/ProductManagement";
import VariantManagement from "../pages/Admin/ProductManagement/variant";
import PaymentManagement from "../pages/Admin/PaymentManagement";
import PermissionGroupManagement from "../pages/Admin/PermissionGroupManagement";
import PermissionManagement from "../pages/Admin/PermissionManagement";
import RoleManagement from "../pages/Admin/RoleManagement";
import NewsManagement from "../pages/Admin/NewsManagement";
import RerserveTableManagement from "../pages/Admin/ReserveTableManagement";

// k đăng nhập sd đc
const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null },
  { path: "/menu", component: Menu, layout: FullScreenLayout },
  { path: "/login-success/:userId", component: LoginSuccess, layout: null },
  // { path: "/test", component: Test, layout: null },

  { path: "/test", component: Test, layout: null },
  { path: "/news", component: News, layout: DefaultLayout },
  { path: "/order", component: Orders, layout: DefaultLayout },
  { path: "/product-detail/:prodId", component: ProductDetail, layout: DefaultLayout },

  // not other routes match
  { path: "/not-found", component: Error, layout: null },
  { path: "*", component: Error, layout: null },
];

// đăng nhập ms sd đc
const privateRoutes = [
  // system
  // role admin 1
  { path: "/system", component: DashBoard, layout: AdminLayout },
  { path: "/system/users", component: UserManagement, layout: AdminLayout },
  { path: "/system/product", component: ProductManagement, layout: AdminLayout },  
  { path: "/system/product/:id", component: VariantManagement, layout: AdminLayout },
  { path: "/system/bill", component: PaymentManagement, layout: AdminLayout },
  { path: "/system/permissions-groups", component: PermissionGroupManagement, layout: AdminLayout },
  { path: "/system/permissions", component: PermissionManagement, layout: AdminLayout },  
  { path: "/system/role", component: RoleManagement, layout: AdminLayout },  
  { path: "/system/news", component: NewsManagement, layout: AdminLayout },  
  { path: "/system/reserve-table", component: RerserveTableManagement, layout: AdminLayout },  


  // role user 4
  { path: "/profile", component: Profile, layout: DefaultLayout },

  // client
  { path: "/cart", component: Cart, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
