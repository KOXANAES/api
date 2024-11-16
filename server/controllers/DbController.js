const cardService = require('../services/CardService')

class DbController { 

  async add(req,res,next) { 
    try {
      const {creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner} = req.body
      const card = await cardService.add(creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner)
      return res.json(card)
    } catch(e) { 
      next(e)
    }
  }

  async addArray(req,res,next) { 
    try {
      const {num, creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner} = req.body
      const cards = await cardService.addArray(num, creationDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner)
      return res.json(cards)
    } catch(e) { 
      next(e)
    }
  }

  async fill(req,res,next) { 
    try {
      const {id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds, changeStatus, fillDate} = req.body
      console.log(id)
      const card = await cardService.fill(id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violationIds, changeStatus, fillDate)
      return res.json(card)
    } catch(e) { 
      next(e)
    }
  }

  async addViolation(req,res,next) {
    try { 
      const {name, description} = req.body
      const addedViolation = await cardService.createViol(name, description)
      return res.json(addedViolation)
    } catch(e) { 
      next(e)
    }
  }

  async destroy(req,res,next) { 
    try {
      const {id} = req.body
      const card = await cardService.destroy(id)
      return res.json({message:`Карточка с id ${id} была уничтожена`})
    } catch(e) { 
      next(e)
    }
  }

  async change(req,res,next) { 
    try {
      const {id, param, value} = req.body
      const card = await cardService.change(id, param, value)
      return res.json(card)
    } catch(e) { 
      next(e)
    }
  }

  async findAll(req,res,next) { 
    try {
      const cards = await cardService.findAll()
      return res.json(cards)
    } catch(e) { 
      next(e)
    }
  }

  async findOne(req,res,next) { 
    try {
      const {id} = req.body
      const card = await cardService.findOne(id)
      return res.json(card)
    } catch(e) { 
      next(e)
    }
  }

  async fetchViolations(req,res,next) { 
    try { 
      const violations = await cardService.fetchViolations()
      return res.json(violations)
    } catch(e) {
      next(e)
    }
  }
  
  async addViolationVariant(req,res,next) { 
    try { 
      const {name, description} = req.body 
      const addedViolationVariant = await cardService.addViolationVariant(name, description)
      return res.json(addedViolationVariant)
    } catch(e) { 
      next(e)
    }
  } 

}

module.exports = new DbController()