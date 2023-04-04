/**
 *
 * @param {Object} res
 * @param {Object} data
 * @returns Object
 */
const success = (res, data = undefined) => {
  return res.status(200).json({
    success: true,
    data,
  })
}
/**
 *
 * @param {Object} res
 * @param {Object} error
 * @param {Number} status
 * @returns Object
 */
const error = (res, error, status = 200) => {
  let message = error?.errors?.[0]?.message || error?.message
  message = message.replace(/"/g, '').replace(/'/g, '')

  return res.status(status).json({
    success: false,
    error: { message },
  })
}

const ResponseHandler = {
  success,
  error,
}

export default ResponseHandler
