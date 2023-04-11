import Repository from '../repositories/product.js'

export const Product = {
  count: async (where) => await Repository.count(where),
  getAll: async () => await Repository.getAll(),
  create: async (data) => await Repository.create(data),
  update: async (id, data) => await Repository.update(id, data),
  find: async (filter) => await Repository.find(filter),
  findById: async (id) => await Repository.findById(id),
  delete: async (id) => await Repository.delete(id),
}
