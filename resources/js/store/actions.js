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
    // return axios.post('cart',product)
}