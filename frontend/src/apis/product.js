import apiCaller from '../helpers/apiCaller.js'

const ProductApi = {
  getAll: async () => await apiCaller(`products/all`),
  count: async () => await apiCaller(`products/count`),
  find: async (query) => await apiCaller(`products?${query}`),
  findById: async (id) => await apiCaller(`products/${id}`),
  create: async (data) => await apiCaller(`products`, 'POST', data),
  update: async (id, data) => await apiCaller(`products/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`products/${id}`, 'DELETE'),
}
export default ProductApi
