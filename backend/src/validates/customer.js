import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schemaDefine = {
  firstName: Joi.string().trim().required().min(1).max(30),
  lastName: Joi.string().trim().required().min(1).max(30),
  email: Joi.string().trim().required().min(1).max(50).email(),
  username: Joi.string().trim().required().min(1).max(50),
  password: Joi.string().required().min(8).max(50),
  phone: Joi.string().required().min(8).max(50),
  gender: Joi.any(),
  birthday: Joi.any(),
  avatar: Joi.any(),
  photos: Joi.any(),
  countryId: Joi.any(),
}

export default {
  create: async (req, res, next) => {
    try {
      let schema = {}
      Array.from([
        'firstName',
        'lastName',
        'email',
        'phone',
        'username',
        'password',
        'gender',
        'birthday',
        'avatar',
        'photos',
        'countryId',
      ]).forEach((key) => (schema[key] = schemaDefine[key]))
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
      Array.from([
        'firstName',
        'lastName',
        'email',
        'phone',
        'username',
        'gender',
        'birthday',
        'avatar',
        'photos',
        'countryId',
      ]).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
