export const Routing = {
  Home: { path: "/" },

  //customer
  CustomerHome: { path: "/home" },
  Signup: { path: "/signup" },
  Signin: { path: "/login" },
  Cart: { path: "/cart" },
  Checkout: { path: "/checkout" },
  Confirmation: { path: "/confirmation" },
  Category: { path: "/products/:id" },
  Detail: { path: "/detail/:id" },
  Collection: { path: "/collection" },
  AddCollection: { path: "/collection/add" },
  CollectionDetail: { path: "/collection/:id" },
  EditCollection: { path: "/collection/:id/edit" },
  AddCollectionProduct: { path: "/collection/:id/add" },

  //admin
  AdminHome: { path: "/admin" },
  Products: { path: "/admin/products" },
  AddProduct: { path: "/admin/addproduct" },
  EditProduct: { path: "/admin/products/edit/:sku" },
  Orders: { path: "/admin/orders" },
  OrderDetail: { path: "/admin/orders/:id" },
  Customers: { path: "/admin/customers" },
  CustomerDetail: { path: "/admin/customers/:id" },
};
