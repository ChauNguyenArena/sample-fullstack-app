import Repository from './../repositories/user.js'

const User = {
  login: async ({ username, password }) => await Repository.login({ username, password }),
  getByToken: async (authorization) => await Repository.getByToken(authorization),
  count: async (where) => await Repository.count(where),
  find: async (filter) => await Repository.find(filter),
  findById: async (id) => await Repository.findById(id),
  create: async (data) => await Repository.create(data),
  update: async (id, data) => await Repository.update(id, data),
  delete: async (id) => await Repository.delete(id),
}

export default User
