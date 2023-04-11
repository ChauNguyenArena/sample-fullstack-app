import VendorModel from '../models/vendor.js'
import Model from '../models/product.js'
import generatePagination from '../helpers/generatePagination.js'
import { Op } from 'sequelize'
import ErrorCodes from '../constants/errorCodes.js'

const include = [{ model: VendorModel, as: 'vendor' }]

const count = async (where) => {
  return await Model.count(where)
}

const getAll = async (where) => {
  let items = [],
    page = 1
  let _where = where || {}

  const count = await Model.count({ where: _where })

  while (page >= 1) {
    let filter = {
      where: _where,
      limit: 100,
      offset: (page - 1) * 100,
      order: [['updatedAt', 'DESC']],
    }

    let res = await Model.findAll(filter)

    items = items.concat(res)

    page = items.length >= count ? -1 : page + 1
  }

  return items.map((item) => item.toJSON())
}

const findById = async (id) => {
  const data = await Model.findOne({ where: { id }, include })
  if (!data) {
    throw new Error(ErrorCodes.NOT_FOUND)
  }
  return data.toJSON()
}

const find = async ({ page, limit, where, search, vendor, status, publish }) => {
  let _page = page >= 1 ? page : 1
  let _limit = limit >= 1 && limit <= 100 ? limit : 20

  let _where = where || {}
  if (search) {
    _where = {
      ..._where,
      [Op.or]: [
        {
          title: { [Op.iLike]: `%${search}%` },
        },
        {
          description: { [Op.iLike]: `%${search}%` },
        },
        {
          handle: { [Op.iLike]: `%${search}%` },
        },
      ],
    }
  }

  if (vendor) {
    _where = { ..._where, vendorId: vendor }
  }

  if ('' + status === 'ACTIVE' || '' + status === 'ARCHIVED' || '' + status === 'DRAFT') {
    _where = { ..._where, status }
  }

  if ('' + publish === 'true' || '' + publish === 'false') {
    _where = { ..._where, publish }
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

const create = async (data) => {
  const created = await Model.create(data, include)

  return created.toJSON()
}

const update = async (id, data) => {
  const _update = await Model.update(data, { where: { id }, returning: true, plain: true })

  return await findById(id)
}

const _delete = async (id) => {
  return await Model.destroy({ where: { id } })
}

export default { count, getAll, findById, find, create, update, delete: _delete }
