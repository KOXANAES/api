const DbController = require('../controllers/DbController')

const Router = require('express')
const DbRouter = new Router()

const Validators = require('../validator/FieldsValidator')

DbRouter.post('/add', 
  Validators.addCardsValidator(),
  DbController.add) 
DbRouter.post('/addArray',DbController.addArray)
DbRouter.post('/fill',
  Validators.fillCardValidator(),
  DbController.fill) 
DbRouter.post('/destroy', DbController.destroy)
DbRouter.post('/change', DbController.change)
DbRouter.post('/addViolation', DbController.addViolation)
DbRouter.get('/findAll', DbController.findAll)
DbRouter.post('/findOne', DbController.findOne)
DbRouter.post('/addViolationVariant', DbController.addViolationVariant)
DbRouter.get('/fetchViolations', DbController.fetchViolations)

module.exports = DbRouter 