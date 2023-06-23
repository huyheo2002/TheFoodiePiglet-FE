// layouts
import DefaultLayout from "../layouts/DefaultLayout"
// pages
import Home from "../pages/Home"
import Login from "../pages/Login"
import Test from "../pages/Test"

// k đăng nhập sd đc
const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/login", component: Login, layout: null },
    { path: "/test", component: Test, layout: null },

]

// đăng nhập ms sd đc
const privateRoutes = [

]

export { publicRoutes, privateRoutes }