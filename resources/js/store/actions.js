export function getProducts({commit,state}){
    return axios.get('api/products')
    .then(response => {
        commit('setProducts', [false, response.data])    
    })
}

export function createCart({commit,state},{product,quantity}){
    if(product.id){
        const form = new FormData();
        form.append('product_id',product.id);
        form.append('quantity',quantity?quantity:1)
        product = form
    }
    return axios.post('cart',product)
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
  
    console.log(updatedCartItems);
  
    commit('setCartItems', [false, { data: updatedCartItems }]);
  }
  