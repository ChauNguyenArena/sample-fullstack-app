import ErrorCodes from '../constants/errorCodes.js'
import ResponseHandler from '../helpers/responseHandler.js'

export default {
  verifyToken: async (req, res, next) => {
    try {
      const { authorization } = req.headers

      if (!authorization) {
        return ResponseHandler.error(res, { message: ErrorCodes.UNAUTHORIZED })
      }

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
