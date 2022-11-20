const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'El precio es obligatorio'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updtedAt: {
    type: Date,
    required: true,
  },
})

ProductSchema.methods.toJSON = function () {
  const { __v, _id, status, createdAt, modifiedAt, ...product } =
    this.toObject()
  product.id = _id

  product.createdAt = DateTime.fromISO(createdAt.toISOString())
  product.updtedAt = DateTime.fromJSDate(modifiedAt, {
    zone: 'America/Bogota',
  })

  const { _id: _uId, password, __v: __uV, ...user } = product.user
  user.id = _uId
  product.user = user

  return product
}

module.exports = model('Product', ProductSchema)
