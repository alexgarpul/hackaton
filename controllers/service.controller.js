const { request, response } = require('express')
const Service = require('../models/service')
const service = require('../models/service')

const getServices = async (req = request, res = response) => {
    try {
      let { from = 0, lot = 5 } = req.query
      from = from <= 0 || isNaN(from) ? 0 : from - 1
  
      const query = { status: true }
  
      const [services, total] = await Service.all([
        Service.find(query)
          .skip(from)
          .limit(lot),
        Service.countDocuments(query),
      ])
  
      const quantity = services.length
      const pagination = {
        from: Number(from + 1),
        lot: Number(lot),
      }
  
      res.json({
        total,
        quantity,
        pagination,
        services,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Error en el servidor',
      })
    }
  }

  
  const createService = async (req = request, res = response) => {
    try{
    const { name, address, numberPhone,neighborhood,user,product } = req.body
    const service = new Service({ name, address, numberPhone, neighborhood, user, product})
    await service.save()
  
    res.status(201).json({
      service,
    })
  } catch (error){
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}


  module.exports= {
    getServices,
    createService,
  }