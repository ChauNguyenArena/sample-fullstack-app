import ResponseHandler from '../helpers/responseHandler.js'
import fs from 'fs'

export default {
  get: async (req, res, next) => {
    try {
      const { filename } = req.params

      const filepath = `${process.cwd()}/uploads/${filename}`

      if (!fs.existsSync(filepath)) {
        throw new Error('File not found')
      }

      res.sendFile(filepath)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  upload: async (req, res) => {
    try {
      let data = req.files.map((item) => ({
        filename: item.filename,
        mimetype: item.mimetype,
        size: item.size,
        url: `${process.env.HOST}/api/uploads/${item.filename}`,
      }))

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
