import "./styles/global.scss";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/dashboard";
import LineChart from "./pages/lineChart/LineChart";
import Login from "./pages/controll/Controll";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";
import User from "./pages/user/User";
import Users from "./pages/users/Users";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParentTwo from "./pages/field2/ParentTwo";
import ParentThree from "./pages/field3/ParentThree";
import Controll from "./pages/controll/Controll";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/home",
          element: <Dashboard />,
        },

        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        }, {
          path: "/linechart",
          element: <LineChart />,
        },
        {
          path: "/field/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/fieldtwo",
          element: <ParentTwo />,
        },
        {
          path: "/fieldthree",
          element: <ParentThree />,
        },{
          path: "/controll",
            element: <Controll />,
            },
        
  ],
    },
{
  path: "/controll",
    element: <Controll />,
    },
  ]);

return (<><RouterProvider router={router} />
  <ToastContainer /></>);
}

export default App;
