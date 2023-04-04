import ErrorCodes from '../constants/errorCodes.js'
import ResponseHandler from '../helpers/responseHandler.js'
import User from '../middlewares/user.js'

export default {
  login: async (req, res) => {
    try {
      const data = await User.login(req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  getByToken: async (req, res) => {
    try {
      const { authorization } = req.headers

      const data = await User.getByToken(authorization)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  count: async (req, res) => {
    try {
      let where = JSON.parse(req.query.where || '{}')

      const data = await User.count(where)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      let filter = { ...req.query }
      filter.where = filter.where ? JSON.parse(filter.where) : {}

      const data = await User.find(filter)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params

      const data = await User.findById(id)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const data = await User.create(req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const { authorization } = req.headers
      const { id } = req.params

      const session = await User.getByToken(authorization)

      if (session.id != id) {
        throw new Error(ErrorCodes.UNAUTHORIZED)
      }

      const data = await User.update(id, req.body)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      await User.delete(id)

      return ResponseHandler.success(res)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
