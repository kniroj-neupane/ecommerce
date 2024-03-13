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
  const index = state.cartItems.findIndex(item => item.id === deletedItemId);

  if (index !== -1) {
    // Remove the deleted item from the cartItems array
    state.cartItems.splice(index, 1);
  }
}