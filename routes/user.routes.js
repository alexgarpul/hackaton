const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateJWT, isRole } = require('../middlewares')
const { isValidRole, emailExists, userByIdExists } = require('../helpers')
const {
  getUsers,
  createUser,
} = require('../controllers')

const router = Router()

router.get('/', getUsers)

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('typedocument', 'el tipo de documennto es requerido').not().isEmpty(),
    check('numberDocument' , 'el numero de documento es requerido').not().isEmpty(),
    check('numberDocument' , 'el numero de documento no es valido').isLength(11),
    check('numberPhone', 'El numero de telefono es requerido').not(),
    check('password', 'El passsword es obligatorio').not().isEmpty().isEmpty(),
    check('password', 'El passsword debe ser de 6 letras o más').isLength({
      min: 6,
    }),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('role').custom(isValidRole),
    validateFields,
  ],
  createUser
)


module.exports = router
