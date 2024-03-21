import axios from "axios";

export function getProducts({ commit, state }) {
  return axios.get('api/products')
    .then(response => {
      commit('setProducts', [false, response.data])
    })
}

export function createCart({ commit, state }, { product, quantity }) {
  if (product.id) {
    const form = new FormData();
    form.append('product_id', product.id);
    form.append('quantity', quantity ? quantity : 1)
    product = form
  }
  return axios.post('cart', product)
}
export function setCartItems({ commit }, { cartItems, products }) {

  // Map through each object in cartItems and merge properties from products
  const updatedCartItems = cartItems.data.map(cartItem => {
    // Find the corresponding product in products based on productId
    const matchingProduct = products.data.find(product => product.id === cartItem.product_id);

    // Combine properties from cartItem and matchingProduct
    return {
      id: cartItem.id,
      userId: cartItem.user_id,
      productId: cartItem.product_id,
      quantity: cartItem.quantity,
      title: matchingProduct ? matchingProduct.title : null,
      imageUrl: matchingProduct ? matchingProduct.image_url : null,
      price: matchingProduct ? matchingProduct.price : null,
    };
  });


  commit('setCartItems', [false, { data: updatedCartItems }]);
}
export function getCartCount() {
  return axios.get('/cart/count');
}
export function removeCartItem({ commit, state }, cartItem) {
  return axios.delete(`/cart/${cartItem.id}`)
    .then(response => {
      commit('removeCartItem', cartItem.id)
    })
    .catch(error => {
      console.error(error)
    })
}

export function payment({ commit, state }, formData) {
  const cartItems = state.cartItems;
  const order = cartItems.data.map(cartItem => {
    return {
      id: cartItem.id,
      userId: cartItem.user_id,
      productId: cartItem.product_id,
      quantity: cartItem.quantity,
      price: cartItem.price,
    };
  });

  // Combine formData and order
  const combinedData = {
    ...formData,
    order: order
  };

  // Make a POST request using Axios
  return axios.post('/payment', combinedData)
    .then(response => {
      // Handle success response
      console.log('Payment successful:', response.data);
      // Optionally, you can commit mutations or perform other actions here
    })
    .catch(error => {
      // Handle error response
      console.error('Payment error:', error);
      // Optionally, you can handle errors or show error messages to the user
    });
}

export function getCategories({ commit, state }) {
  return axios.get('categories')
    .then(response => {
      commit('setCategories', [false, response.data])
      console.log(response.data)
    })
}

