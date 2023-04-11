import Repository from '../repositories/vendor.js'

export const Vendor = {
  getAll: async () => await Repository.getAll(),
  create: async (data) => await Repository.create(data),
  count: async (where) => await Repository.count(where),
  update: async (id, data) => await Repository.update(id, data),
  find: async (filter) => await Repository.find(filter),
  findById: async (id) => await Repository.findById(id),
  delete: async (id) => await Repository.delete(id),
}
