export const Routing = {
  Home: { path: "/" },

  //customer
  CustomerHome: { path: "/home" },
  Signup: { path: "/signup" },
  Signin: { path: "/login" },
  Cart: { path: "/cart" },
  Checkout: { path: "/checkout" },
  Confirmation: { path: "/confirmation/:id" },
  Category: { path: "/products/:id" },
  Detail: { path: "/product/:id" },
  Wishlist: { path: "/wishlist" },
  Collection: { path: "/collection" },
  AddCollection: { path: "/collection/add" },
  CollectionDetail: { path: "/collection/:id" },
  EditCollection: { path: "/collection/:id/edit" },
  AddCollectionProduct: { path: "/collection/:id/add" },
};
