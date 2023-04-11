import ResponseHandler from '../helpers/responseHandler.js'
import { Product } from '../middlewares/product.js'

export default {
  count: async (req, res) => {
    try {
      const where = JSON.parse(req.query.where || '{}')

      const data = await Product.count(where)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await Product.getAll()

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const data = await Product.create(req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      let filter = { ...req.query }
      filter.where = filter.where ? JSON.parse(filter.where) : {}

      const data = await Product.find(filter)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params

      const data = await Product.findById(id)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params
      const data = await Product.update(id, req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      await Product.delete(id)

      return ResponseHandler.success(res)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
