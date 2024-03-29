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
export function setCartItems(state,[loading,data=null]){
  if(data) {
    state.cartItems = {
      ...state.cartItems,
      data: [...data.data],
    };
  }
  state.cartItems.loading = loading;
}
export function removeCartItem(state,deletedItemId){
  const index = state.cartItems.data.findIndex(item => item.id === deletedItemId);
  if (index !== -1) {
    // Remove the deleted item from the cartItems array
    state.cartItems.data.splice(index, 1);
  }
}

export function setCategories(state,[loading,data=null]){
  if(data) {
    state.categories = {
      ...state.categories,
      data: [...data.data],
    };
  }
  state.categories.loading = loading;
}