export const state = {
    products: {
      loading: false,
      data: [],
      links: [],
      from: null,
      to: null,
      page: 1,
      limit: null,
      total: null
    },
    cartItems: {
      data: [],
      loading: false,
    },
    order:{
      data: [],
      total: 0,
    },
    categories:{
      data: [],
      loading: false,
    }
  };
  