const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const Router = require('express')
const AuthRouter = new Router()

const Validators = require('../validator/FieldsValidator')

AuthRouter.post('/registration', 
  Validators.registrationValidator(),
  AuthController.registration,
);
AuthRouter.post('/login',
  Validators.loginValidator(),
  AuthController.login)
AuthRouter.post('/logout', AuthController.logout)
AuthRouter.post('/sendMail', AuthController.sendMail)
AuthRouter.post('/help', AuthController.help)
AuthRouter.post('/updateNickname',
  Validators.newNicknameValidator(),
  AuthController.updateNickname)
AuthRouter.post('/updateEmail',
  Validators.newEmailValidator(),
  AuthController.updateEmail)
AuthRouter.post('/changePassword',
  Validators.newPasswordValidator(),
  AuthController.changePassword)
AuthRouter.get('/activate/:link', AuthController.activate)
AuthRouter.get('/refresh', AuthController.refresh)
AuthRouter.get('/getUsers', AuthController.getUsers)


module.exports = AuthRouter