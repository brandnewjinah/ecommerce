export const demoOrders = [
  {
    date: "2021-01-26T21:22:28-08:00",
    id: 1,
    shipping: {
      firstName: "Jinah",
      lastName: "Lee",
      address1: "1234 Abc Rd.",
      address2: "",
      city: "City",
      state: "State",
      zip: "12345",
      phone: "9876543210",
      shipping: "standard",
    },
    billing: {
      firstName: "Jinah",
      lastName: "Lee",
      cardNumber: "1234",
    },
    items: [
      {
        brand: "Macaron Lab",
        name: "Macaron French Style",
        currency: {
          id: 501,
          value: "USD",
          label: "$",
        },
        price: 8,
        sku: "36879",
        img: {
          id: 1,
          src: "https://img-cf.kurly.com/shop/data/goods/1561100005251y0.jpg",
        },
        qty: 1,
      },
      {
        brand: "Maman Gateau",
        name: "Roll Cake",
        currency: {
          id: 501,
          value: "USD",
          label: "$",
        },
        price: 6.5,
        sku: "10997",
        img: {
          id: 1,
          src: "https://img-cf.kurly.com/shop/data/goods/1518486490306y0.jpg",
        },
        qty: 1,
      },
    ],
    total: 14.5,
    status: "ordered",
  },
];
