import express from 'express'
import Controller from '../controllers/product.js'
import Validate from '../validates/product.js'

const router = express.Router()

router.get('/all', Controller.getAll)
router.get('/count', Controller.count)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post('/', Validate.create, Controller.create)
router.put('/:id', Validate.update, Controller.update)
router.delete('/:id', Controller.delete)

export default router
