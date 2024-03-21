import axiosClient from '../axios.js';

export function login({commit},data)
{
    return axiosClient.post('/login',data)
        .then(({data})=>{
            commit('setUser',data.user);
            commit('setToken',data.token);
            return data;
        })
}

export function logout({commit})
{
    return axiosClient.post('/logout')
        .then((response)=>{
            commit('setToken',null)
            return response;
        })
}

export function getProducts({commit, state}, {productId,url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setProducts', [true])
  if(productId)
  url = url || `/products/${productId}`
  else 
  url = url ||'/products'
  const params = {
    per_page: state.products.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      console.log(response.data)
      commit('setProducts', [false, response.data])

    })
    .catch(() => {
      commit('setProducts', [false])
    })
}

export function createProduct({commit}, product) {
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append('title', product.title);
    product.images.forEach(im => form.append('images[]', im))
    form.append('description', product.description || '');
    form.append('published', product.published ? 1 : 0);
    form.append('price', product.price);
    form.append('quantity', product.quantity);
    product = form;
  }
  return axiosClient.post('/products', product)
}
export function updateProduct({commit}, product) {
  const id = product.id
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append('id', product.id);
    form.append('title', product.title);
    product.images.forEach(im => form.append(`images[${im.id}]`, im))
    if (product.deleted_images) {
      product.deleted_images.forEach(id => form.append('deleted_images[]', id))
    }
    for (let id in product.image_positions) {
      form.append(`image_positions[${id}]`, product.image_positions[id])
    }
    form.append('description', product.description || '');
    form.append('published', product.published ? 1 : 0);
    form.append('price', product.price);
    form.append('_method', 'PUT');
    product = form;
  } else {
    product._method = 'PUT'
  }
  return axiosClient.post(`/products/${id}`, product)
}
export function deleteProduct({commit},id)
{
  return axiosClient.delete(`/products/${id}`);
  
}

// categories
export function getCategories({commit, state}, {categoryId,url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setCategories', [true])
  if(categoryId)
  url = url || `/categories/${categoryId}`
  else 
  url = url ||'/categories'
  const params = {
    per_page: state.categories.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setCategories', [false, response.data])

    })
    .catch(() => {
      commit('setCategories', [false])
    })
}

export function createCategory({commit}, category) {
  if (category.images && category.images.length) {
    const form = new FormData();
    form.append('name', category.name);
    category.images.forEach(im => form.append('images[]', im))
    form.append('published', category.published ? 1 : 0);
    category = form;
  }
  return axiosClient.post('/categories', category)
}
export function deleteCategory({commit},id)
{
  return axiosClient.delete(`/categories/${id}`);
  
}