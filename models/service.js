const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')
const product = require('./product')


const ServiceSchema = Schema({
    name: {
    type:String,
    unique:true,
    required: [true, 'El nombre es obligatorio'],
    },
    address:{
        type: String,
        required: [true, 'La dirección es requerido']
    },
    phoneNumber: {
        type: String,
        required: [true, 'El telefono es requerido']
    },
    neighborhood:{
        type: String,
        required: [true, 'El barrio es requerido']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido']
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El producto es requerido']
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedAt:{
        type: Date,
        required: true
    }
})

ServiceSchema.methods.toJSON = function () {
    const { __v, _id, status, createdAt, updatedAt, ...service} = this.toObject()
    service.id = _id

    service.createdAt = DateTime.fromISO(createdAt.toISOString())
    service.updatedAt = DateTime.fromJSDate(updatedAt, {
        zone: 'America/Bogota',
    })

    const { _id: _uId, password, __v: __uV, ...user } = service.user
    user.id = _uId
    service.user = user

    return service
}

module.exports = model('Service', ServiceSchema)