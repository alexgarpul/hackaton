const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  description:{
    type: String,
    required: [true, 'La descripción es requerida']
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
  const { __v, _id, status, createdAt, updtedAt, ...product } =
    this.toObject()
  product.id = _id

  product.createdAt = DateTime.fromISO(createdAt.toISOString())
  product.updtedAt = DateTime.fromJSDate(updtedAt, {
    zone: 'America/Bogota',
  })

  return product
}

module.exports = model('Product', ProductSchema)
