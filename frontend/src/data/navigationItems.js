export const navigationItems = [
  {
    id: 100,
    value: "all",
    label: "All",
    link: "/products/all",
  },
  {
    id: 200,
    value: "new",
    label: "New",
    link: "/products/bakery",
  },
  {
    id: 300,
    value: "snacks",
    label: "Snacks",
    link: "/products/snacks",
    subcategory: [
      { id: 301, value: "chips", label: "Chips" },
      { id: 302, value: "cookies", label: "Cookies" },
      { id: 303, value: "candy", label: "Candy" },
      { id: 304, value: "chocolate", label: "Chocolate" },
      { id: 305, value: "savory", label: "Savory" },
    ],
  },
  {
    id: 400,
    value: "beverage",
    label: "Beverage",
    link: "/products/beverage",
    subcategory: [
      { id: 401, value: "coffeeBeans", label: "Coffee Beans" },
      { id: 402, value: "coffeePods", label: "Coffee Pods" },
      { id: 403, value: "greenBlackTea", label: "Green, Black Tea" },
      { id: 404, value: "otherTea", label: "Other Tea" },
    ],
  },
  {
    id: 400,
    value: "pantry",
    label: "Pantry",
    link: "/products/pantry",
    subcategory: [
      { id: 401, value: "coffeeBeans", label: "Coffee Beans" },
      { id: 402, value: "coffeePods", label: "Coffee Pods" },
      { id: 403, value: "greenBlackTea", label: "Green, Black Tea" },
      { id: 404, value: "otherTea", label: "Other Tea" },
    ],
  },
];
