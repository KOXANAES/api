const Router = require('express')
const DbRouter = new Router()
const DbController = require('../controllers/DbController')

DbRouter.post('/add', DbController.add) 
DbRouter.post('/fill', DbController.fill) 
DbRouter.post('/destroy', DbController.destroy)
DbRouter.post('/change', DbController.change)

DbRouter.post('/addViolation', DbController.addViolation)


DbRouter.get('/findAll', DbController.findAll)
DbRouter.post('/findOne', DbController.findOne)

DbRouter.post('/addViolationVariant', DbController.addViolationVariant)
DbRouter.get('/fetchViolations', DbController.fetchViolations)

module.exports = DbRouter 