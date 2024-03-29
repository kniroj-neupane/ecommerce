export function setUser(state, user) {
    state.user.data = user;
  }
  
  export function setToken(state, token) {
    state.user.token = token;
    if (token) {
      sessionStorage.setItem('TOKEN', token);
    } else {
      sessionStorage.removeItem('TOKEN')
    }
  }

  export function setProducts(state, [loading, data = null]) {
    if (data) {
      state.products = {
        ...state.products,
        data: [...data.data], // Ensure a new array to trigger reactivity
        links: { ...data.meta?.links }, // Ensure a new object for links
        page: data.meta?.current_page,
        limit: data.meta?.per_page,
        from: data.meta?.from,
        to: data.meta?.to,
        total: data.meta?.total,
      };
    }
    state.products.loading = loading;
  }

  export function setCategories(state, [loading, data = null]) {
    if (data) {
      state.categories = {
        ...state.categories,
        data: [...data.data], // Ensure a new array to trigger reactivity
      };
    }
    state.categories.loading = loading;
  }
  