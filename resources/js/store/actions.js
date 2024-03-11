export function getProducts({commit,state}){
    return axios.get('api/products')
    .then(response => {
        commit('setProducts', [false, response.data])    
    })
}