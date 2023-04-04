import apiCaller from '../helpers/apiCaller.js'

const CustomerApi = {
  count: async () => await apiCaller(`customers/count`),
  find: async (query) => await apiCaller(`customers?${query}`),
  findById: async (id) => await apiCaller(`customers/${id}`),
  create: async (data) => await apiCaller(`customers`, 'POST', data),
  update: async (id, data) => await apiCaller(`customers/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`customers/${id}`, 'DELETE'),
}

export default CustomerApi
