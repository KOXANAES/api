const Router = require('express')
const AuthRouter = new Router()
const AuthController = require('../controllers/AuthController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

AuthRouter.post('/registration', AuthController.registration)
AuthRouter.post('/login',  AuthController.login)
AuthRouter.post('/logout', AuthController.logout)
AuthRouter.post('/sendMail', AuthMiddleware, AuthController.sendMail)
AuthRouter.post('/help', AuthMiddleware, AuthController.help)

AuthRouter.post('/updateNickname', AuthMiddleware, AuthController.updateNickname)

AuthRouter.get('/activate/:link', AuthController.activate)
AuthRouter.get('/refresh', AuthController.refresh)

AuthRouter.get('/getUsers', AuthController.getUsers)

module.exports = AuthRouter