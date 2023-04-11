import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schemaDefine = {
  name: Joi.string().trim().required().min(1).max(50),
}

export default {
  create: async (req, res, next) => {
    try {
      let schema = {}
      Array.from(['name']).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      let schema = {}
      Array.from(['name']).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
