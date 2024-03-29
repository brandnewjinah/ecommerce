import React from "react";
import { createBrowserRouter } from "react-router-dom";

//layout
import Layout from "./layout/main";
import Blank from "./layout/Blank";
import ErrorPage from "./pages/error";

//pages
import Auth from "./pages/auth";
import Home from "./pages/home";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import OrderList from "./pages/orders/OrderList";
import CustomerList from "./pages/customers/CustomerList";
import SubscriberList from "./pages/subscribers/SubscriberList";
import Categories from "./pages/settings/Categories";
import ManageCategory from "./pages/settings/ManageCategory";
import Brands from "./pages/settings/Brands";
import ManageBrand from "./pages/settings/ManageBrand";

const Routes = createBrowserRouter([
  {
    element: <Blank />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Auth />,
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products/list/:category",
        element: <ProductList />,
      },
      {
        path: "/products/add",
        element: <AddProduct />,
      },
      {
        path: "/product/:id",
        element: <AddProduct />,
      },
      {
        path: "/orders/list/:category",
        element: <OrderList />,
      },
      {
        path: "/customers/list",
        element: <CustomerList />,
      },
      {
        path: "/subscribers/list",
        element: <SubscriberList />,
      },
      {
        path: "/settings/categories",
        element: <Categories />,
      },
      {
        path: "/settings/category/:id",
        element: <ManageCategory />,
      },
      {
        path: "/settings/brands",
        element: <Brands />,
      },
      {
        path: "/settings/brand/:id",
        element: <ManageBrand />,
      },
    ],
  },
]);

export default Routes;

// const Routes = () => {
//   const admin = useSelector((state) => state.auth.currentUser);
//   const isAdmin = admin && admin.isAdmin;

//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Layout>
//           <PrivateRoute path="/home" component={Home} />
//           <PrivateRoute exact path="/products" component={ProductList} />
//           <PrivateRoute exact path="/addproduct" component={AddProduct} />
//           <PrivateRoute exact path="/products/:id" component={ProductDetail} />
//           <PrivateRoute
//             exact
//             path="/products/edit/:id"
//             component={EditProduct}
//           />
//           <PrivateRoute exact path="/orders" component={OrderList} />
//           <PrivateRoute exact path="/orders/:id" component={OrderDetail} />
//           <PrivateRoute exact path="/customers" component={CustomerList} />
//           <PrivateRoute exact path="/users/:id" component={UserDetail} />
//           <PrivateRoute exact path="/subscribers" component={SubscribersList} />
//         </Layout>
//       </Switch>
//     </Router>
//   );
// };

// export default Routes;
