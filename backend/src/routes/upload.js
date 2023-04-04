import express from 'express'
import Controller from '../controllers/upload.js'
import MulterUpload from '../connector/multer/index.js'

const router = express.Router()

router.post('/', MulterUpload.array('files', 10), Controller.upload)
router.get('/:filename', Controller.get)

export default router
