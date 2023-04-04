import apiCaller from '../helpers/apiCaller.js'

const UserApi = {
  count: async () => await apiCaller(`users/count`),
  find: async (query) => await apiCaller(`users?${query}`),
  findById: async (id) => await apiCaller(`users/${id}`),
  create: async (data) => await apiCaller(`users`, 'POST', data),
  update: async (id, data) => await apiCaller(`users/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`users/${id}`, 'DELETE'),
}

export default UserApi
