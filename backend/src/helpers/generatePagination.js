/**
 *
 * @param {Number} page
 * @param {Number} limit
 * @param {Number} count
 * @returns Object
 */
const generatePagination = (page, limit, count) => {
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
  }
}

export default generatePagination
