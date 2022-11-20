const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT, validateFields } = require('../middlewares')
const {
    getServices, createService,
} =require('../controllers')

const router = Router()

router.get('/', getServices)

router.post('/',
[
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('address', 'La dirección es requerida').not().isEmpty(),
    check('phoneNumber', 'El telefono es requerido').not().isEmpty(),
    check('neighborhood', 'El barrio es requerido').not().isEmpty(),
    check('user', 'El usuario es requerido').not().isEmpty(),
    check('user', 'El ID de usuario no es valido').isMongoId(),
    check('product', 'El producto es requerido').not().isEmpty(),
    check('product', 'El id del producto no es valido').isMongoId(),
    validateFields,
],
createService
)



module.exports = router