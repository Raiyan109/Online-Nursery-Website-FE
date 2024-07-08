import AllProducts from "@/pages/AllProducts";
import Cart from "@/pages/Cart";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/allProducts',
        element: <AllProducts />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/cart',
        element: <Cart />
    },
])

export default routes