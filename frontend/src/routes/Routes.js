import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routing } from "./Path";
import { Wrapper } from "../components/layout/Wrapper";

//import home
import Redirect from "../pages/redirect/Redirect";

//import customer pages
import CustomerLayout from "../components/main/Layout";
import Home from "../pages/home/Home";
import Category from "../pages/category";
import Collection from "../pages/collection/Collection";
import AddCollection from "../pages/collection/AddCollection";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import Detail from "../pages/products/Detail";
import CollectionDetail from "../pages/collection/Detail";
import AddCollectionProduct from "../pages/collection/AddProduct";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Confirmation from "../pages/order/OrderConfirmation";

//import cms pages
import AdminLayout from "../components/admin/Layout";
import AdminHome from "../pages/admin/Home";
import AddProduct from "../pages/admin/products/AddProducts";
import Products from "../pages/admin/products/ProductList";
import Orders from "../pages/admin/orders/OrderList";
import OrderDetail from "../pages/admin/orders/OrderDetail";
import Users from "../pages/admin/users/UserList";
import UserDetail from "../pages/admin/users/Detail";

const Layout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Wrapper>
          {props.location.pathname === "/" ? (
            <Component {...props} />
          ) : props.location.pathname.includes("/admin") ? (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
          ) : (
            <CustomerLayout>
              <Component {...props} />
            </CustomerLayout>
          )}
        </Wrapper>
      )}
    />
  );
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout exact path={Routing.Home.path} component={Redirect} />
        <Layout exact path={Routing.AdminHome.path} component={AdminHome} />
        <Layout exact path={Routing.Products.path} component={Products} />
        <Layout exact path={Routing.AddProduct.path} component={AddProduct} />
        <Layout exact path={Routing.EditProduct.path} component={AddProduct} />
        <Layout exact path={Routing.Orders.path} component={Orders} />
        <Layout exact path={Routing.OrderDetail.path} component={OrderDetail} />
        <Layout exact path={Routing.Customers.path} component={Users} />
        <Layout
          exact
          path={Routing.CustomerDetail.path}
          component={UserDetail}
        />
        <Layout exact path={Routing.CustomerHome.path} component={Home} />
        <Layout exact path={Routing.Category.path} component={Category} />
        <Layout exact path={Routing.Detail.path} component={Detail} />
        <Layout exact path={Routing.Collection.path} component={Collection} />
        <Layout
          exact
          path={Routing.AddCollection.path}
          component={AddCollection}
        />
        <Layout
          exact
          path={Routing.CollectionDetail.path}
          component={CollectionDetail}
        />
        <Layout
          exact
          path={Routing.EditCollection.path}
          component={AddCollection}
        />
        <Layout
          exact
          path={Routing.AddCollectionProduct.path}
          component={AddCollectionProduct}
        />
        <Layout exact path={Routing.Signup.path} component={Signup} />
        <Layout exact path={Routing.Signin.path} component={Login} />
        <Layout exact path={Routing.Cart.path} component={Cart} />
        <Layout exact path={Routing.Checkout.path} component={Checkout} />
        <Layout
          exact
          path={Routing.Confirmation.path}
          component={Confirmation}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
