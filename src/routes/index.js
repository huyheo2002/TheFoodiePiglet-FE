// layouts
import DefaultLayout from "../layouts/DefaultLayout"
// pages
import Home from "../pages/Home"
import Test from "../pages/Test"

// k đăng nhập sd đc
const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/test", component: Test, layout: null }

]

// đăng nhập ms sd đc
const privateRoutes = [

]

export { publicRoutes, privateRoutes }