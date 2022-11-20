const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const {
  getProducts,
  createProduct,
} = require('../controllers')

const router = Router()

router.get('/', getProducts)

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('price', 'El precio no es valido'),
    validateFields,
  ],
  createProduct
)

module.exports = router
