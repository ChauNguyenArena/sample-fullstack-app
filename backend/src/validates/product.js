import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schemaDefine = {
  title: Joi.string().trim().required().min(1).max(250),
  description: Joi.string().trim().required().min(1),
  handle: Joi.string().trim().required().min(1),
  price: Joi.any(),
  publish: Joi.any(),
  status: Joi.any(),
  thumbnail: Joi.any(),
  images: Joi.any(),
  vendorId: Joi.any(),
}

export default {
  create: async (req, res, next) => {
    try {
      let schema = {}
      Array.from([
        'title',
        'description',
        'handle',
        'price',
        'publish',
        'status',
        'thumbnail',
        'images',
        'vendorId',
      ]).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    console.log('update')
    try {
      // console.log('req.body', req.body)
      let keys = Object.keys(req.body)
      // console.log('keys', keys)

      let schemaFields = Array.from([
        'title',
        'description',
        'handle',
        'price',
        'publish',
        'status',
        'thumbnail',
        'images',
        'vendorId',
      ]).filter((key) => keys.includes(key))
      // console.log('schemaFields', schemaFields)

      let schema = {}

      schemaFields.forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
