export const navData = [
  {
    id: 100,
    name: "Dashboard",
    link: "/home",
  },
  {
    id: 200,
    name: "Products",
    subcategory: [
      {
        id: 201,
        name: "Product List",
        link: "/products/list/all",
      },
      {
        id: 202,
        name: "Add Product",
        link: "/products/add",
      },
    ],
  },
  {
    id: 300,
    name: "Orders",
    subcategory: [
      {
        id: 301,
        name: "Order List",
        link: "/orders/list/all",
      },
    ],
  },
  {
    id: 400,
    name: "Customers",
    subcategory: [
      {
        id: 401,
        name: "Customer List",
        link: "/customers/list",
      },
    ],
  },
  {
    id: 500,
    name: "Subscribers",
    subcategory: [
      {
        id: 501,
        name: "Subscriber List",
        link: "/subscribers/list",
      },
    ],
  },
  {
    id: 600,
    name: "Settings",
    subcategory: [
      {
        id: 501,
        name: "Admin Access",
        link: "/subscribers/list",
      },
      {
        id: 502,
        name: "Brands",
        link: "/settings/brands",
      },
      {
        id: 503,
        name: "Categories",
        link: "/settings/categories",
      },
    ],
  },
];
