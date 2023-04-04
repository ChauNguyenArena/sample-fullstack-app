import apiCaller from '../helpers/apiCaller.js'

const CountryApi = {
  getAll: async () => await apiCaller(`countries/all`),
  count: async () => await apiCaller(`countries/count`),
  find: async (query) => await apiCaller(`countries?${query}`),
  findById: async (id) => await apiCaller(`countries/${id}`),
  create: async (data) => await apiCaller(`countries`, 'POST', data),
  update: async (id, data) => await apiCaller(`countries/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`countries/${id}`, 'DELETE'),
}
export default CountryApi
