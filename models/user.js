const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  fullName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    
  },
  typeDocument: {
    type: String,
    required: [true, 'El tipo de documento es obligatorio'],
    enum: ['C.C','T.I', 'T.E'],
  },
  numberDocument: {
    type: String,
    required: [true, 'El número de documento es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
  },
  
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  numberPhone :{
    type: String,
    required: [true, 'El numero de telefono es obligatorio'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'CLIENT_ROLE','USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  uptedAt:{
    type: Date,
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.id = _id

  user.createdAt = DateTime.fromISO(createdAt.toISOString())
  user.uptedAt = DateTime.fromJSDate(uptedAt, {
    zone: 'America/Bogota'
  })
  return user
}

module.exports = model('User', UserSchema)
