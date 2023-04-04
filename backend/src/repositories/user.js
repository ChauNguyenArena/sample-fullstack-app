import Model from '../models/user.js'
import CountryModel from '../models/country.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import ErrorCodes from '../constants/errorCodes.js'
import generatePagination from '../helpers/generatePagination.js'

const { JWT_SECRET, JWT_EXPIRATION } = process.env

const include = [{ model: CountryModel, as: 'country' }]

const login = async ({ username, password }) => {
  try {
    let user = null
    if (!user) {
      user = await Model.findOne({ where: { username }, include })
    }
    if (!user) {
      user = await Model.findOne({ where: { email: username }, include })
    }
    if (!user) {
      throw new Error('Username or password incorrect')
    }

    // compare password
    const passwordCompare = await bcrypt.compareSync(password, user.password)
    if (!passwordCompare) {
      throw new Error('Username or password incorrect')
    }

    const token = await jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

    return { user: user.toJSON(), token: `Bearer ${token}` }
  } catch (error) {
    console.log('login error :>> ', error)
    throw error
  }
}

const getByToken = async (token) => {
  try {
    if (!token) {
      throw new Error(ErrorCodes.UNAUTHORIZED)
    }

    const bearerToken = token.replace(/Bearer\s+/g, '')
    const decoded = await jwt.verify(bearerToken, JWT_SECRET)

    if (decoded && decoded.email) {
      let user = await Model.findOne({ where: { email: decoded.email }, include })
      if (user && user.email === decoded.email) return user.toJSON()
    }

    throw new Error(ErrorCodes.UNAUTHORIZED)
  } catch (error) {
    console.log('getByToken error :>> ', error)
    throw new Error(ErrorCodes.UNAUTHORIZED)
  }
}

const count = async (where) => {
  return await Model.count(where)
}

const find = async ({ page, limit, where, search, country, gender }) => {
  let _page = page >= 1 ? page : 1
  let _limit = limit >= 1 && limit <= 100 ? limit : 20

  let _where = where || {}
  if (search) {
    _where = {
      ..._where,
      [Op.or]: [
        {
          firstName: { [Op.iLike]: `%${search}%` },
        },
        {
          lastName: { [Op.iLike]: `%${search}%` },
        },
        {
          email: { [Op.iLike]: `%${search}%` },
        },
        {
          phone: { [Op.iLike]: `%${search}%` },
        },
      ],
    }
  }
  if (country) {
    _where = { ..._where, countryId: country }
  }
  if ('' + gender === 'true' || '' + gender === 'false') {
    _where = { ..._where, gender }
  }

  let filter = {
    where: _where,
    limit: _limit,
    offset: (_page - 1) * _limit,
    order: [['updatedAt', 'DESC']],
    include,
  }

  const count = await Model.count({ where: _where })
  const items = await Model.findAll(filter)

  return {
    items: items.map((item) => item.toJSON()),
    ...generatePagination(_page, _limit, count),
  }
}

const findById = async (id) => {
  const entry = await Model.findOne({ where: { id }, include })
  if (!entry) {
    throw new Error(ErrorCodes.NOT_FOUND)
  }

  return entry.toJSON()
}

const create = async (data) => {
  if (!data.password) {
    throw new Error('Password cannot be blank')
  }

  // generate password encode
  const salt = bcrypt.genSaltSync(10)
  const passwordEncode = bcrypt.hashSync(data.password, salt)
  data.password = passwordEncode

  const created = await Model.create(data)

  return created.toJSON()
}

const update = async (id, data) => {
  const updated = await Model.update(data, {
    where: { id },
    returning: true,
    plain: true,
  })

  return await findById(id)
}

const _delete = async (id) => {
  return await Model.destroy({ where: { id } })
}

export default {
  login,
  getByToken,
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}
