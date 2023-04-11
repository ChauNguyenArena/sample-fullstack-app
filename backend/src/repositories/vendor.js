import ErrorCodes from '../constants/errorCodes.js'
import generatePagination from '../helpers/generatePagination.js'
import Model from '../models/vendor.js'
import { Op } from 'sequelize'

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

const count = async (where) => {
  return await Model.count(where)
}

const findById = async (id) => {
  const data = await Model.findOne({ where: { id } })
  if (!data) {
    throw new Error(ErrorCodes.NOT_FOUND)
  }
  return data.toJSON()
}

const find = async ({ page, limit, where, search }) => {
  let _page = page >= 1 ? page : 1
  let _limit = limit >= 1 && limit <= 100 ? limit : 20

  let _where = where || {}
  if (search) {
    _where = {
      ..._where,
      name: { [Op.iLike]: `%${search}%` },
    }
  }

  let filter = {
    where: _where,
    limit: _limit,
    offset: (_page - 1) * _limit,
    order: [['updatedAt', 'DESC']],
  }

  const count = await Model.count({ where: _where })
  const items = await Model.findAll(filter)

  return {
    items: items.map((item) => item.toJSON()),
    ...generatePagination(_page, _limit, count),
  }
}

const update = async (id, data) => {
  const _update = await Model.update(data, { where: { id }, returning: true, plain: true })
  return _update[1].toJSON()
}

const create = async (data) => {
  const created = await Model.create(data)

  return created.toJSON()
}

const _delete = async (id) => {
  return await Model.destroy({ where: { id } })
}

export default { getAll, create, count, findById, find, update, delete: _delete }
