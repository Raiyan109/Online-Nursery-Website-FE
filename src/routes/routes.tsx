import AddProduct from "@/components/AddProduct";
import ProductDetails from "@/components/ProductDetails";
import ProductTable from "@/components/ProductTable";
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
        path: '/:id',
        element: <ProductDetails />
    },
    {
        path: '/allProducts',
        element: <AllProducts />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard',
                element: <ProductTable />,
            },
            {
                path: 'addProduct',
                element: <AddProduct />,
            }
        ]
    },
    {
        path: '/cart',
        element: <Cart />
    },
])

export default routes