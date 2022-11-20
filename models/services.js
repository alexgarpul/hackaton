const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')
const { stringify } = require('uuid')


const ServiceSchema = Schema({
    name: {
    type:String,
    unique:true,
    required: [true, 'El nombre es obligatorio'],
    },
    address:{
        type:string,
        required: [true, 'La dirección es obligatorio']
    },
    phoneNumber: {
        type:string,
        required: [true, 'El telefono es requerido']
    },
    neiborhooh
})