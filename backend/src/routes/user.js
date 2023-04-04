import express from 'express'
import Controller from './../controllers/user.js'
import MulterUpload from './../connector/multer/index.js'
import Validate from '../validates/user.js'
import AuthValidate from '../validates/auth.js'

const router = express.Router()

router.post('/login', MulterUpload.none(), Validate.login, Controller.login)
router.post('/auth', MulterUpload.none(), AuthValidate.verifyToken, Controller.getByToken)
router.get('/count', Controller.count)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post('/', MulterUpload.none(), Validate.create, Controller.create)
router.put(
  '/:id',
  MulterUpload.none(),
  AuthValidate.verifyToken,
  Validate.update,
  Controller.update
)
// router.delete('/:id', Controller.delete)

export default router
