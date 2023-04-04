import ErrorCodes from '../constants/errorCodes.js'
import ResponseHandler from '../helpers/responseHandler.js'
import Customer from '../middlewares/customer.js'

export default {
  count: async (req, res) => {
    try {
      let where = JSON.parse(req.query.where || '{}')

      const data = await Customer.count(where)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      let filter = { ...req.query }
      filter.where = filter.where ? JSON.parse(filter.where) : {}

      const data = await Customer.find(filter)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params

      const data = await Customer.findById(id)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const data = await Customer.create(req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params

      const data = await Customer.update(id, req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      await Customer.delete(id)

      return ResponseHandler.success(res)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
