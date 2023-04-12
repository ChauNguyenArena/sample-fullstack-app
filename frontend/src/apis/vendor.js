import apiCaller from '../helpers/apiCaller.js'

const VendorApi = {
  getAll: async () => await apiCaller(`vendors/all`),
  count: async () => await apiCaller(`vendors/count`),
  find: async (query) => await apiCaller(`vendors?${query}`),
  findById: async (id) => await apiCaller(`vendors/${id}`),
  create: async (data) => await apiCaller(`vendors`, 'POST', data),
  update: async (id, data) => await apiCaller(`vendors/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`vendors/${id}`, 'DELETE'),
}
export default VendorApi
