const ApiError = require('../exceptions/ApiError')
const {User} = require('../models/models')
const authService = require('../services/AuthService')
const MailService = require('../services/MailService')

const {validationResult} = require('express-validator')

class AuthController { 
  async registration(req,res,next) { 
    try {  
      const errors = validationResult(req)
      if(!errors.isEmpty()) { 
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email,password,nickname} = req.body
      const userData = await authService.registration(email,password,nickname)
      res.cookie('refreshtoken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true}) // добавить secure:true при использовании https
      return res.json(userData)
    } catch(e) { 
      next(e)
    }
  }
  async login(req,res,next) { 
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) { 
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, password} = req.body
      const userData = await authService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
      return res.json(userData)
    } catch(e) { 
      next(e)
    }
  }
  async logout(req,res, next) { 
    try { 
        const {refreshToken} = req.cookies
        const token = await authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch(e) { 
        next(e)
    }
  }
  async activate(req,res, next) { 
    try { 
        const activationLink = req.params.link
        await authService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    } catch(e) { 
        next(e)
    }
  }
  async refresh(req,res,next) { 
    try { 
        const {refreshToken} = req.cookies
        const userData = await authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) 
        return res.json(userData)
    } catch(e) { 
        next(e) 
    }
  }
  
  async sendMail(req,res, next) { 
    try { 
        const {email} = req.body 
        const userData = await authService.sendMail(email)
        return res.json(userData)
    } catch(e) { 
        next(e)
    }
  }

  async help(req,res,next) { 
    try {
        const {UserEmail, message} = req.body

        const admin = await User.findOne({where:{role:'ADMIN'}})
        const adminEmail = admin.email

        await MailService.sendTechHelpMessage(adminEmail, message, UserEmail)

        return res.json({message:'Ваше сообщение было отправлено администрации сервиса'})

    } catch(e) { 
        next(e)
    }
}

  async getUsers(req,res,next) { 
    try { 
      const users = await authService.getUsers()
      return res.json(users)
  } catch(e) { 
      next(e) 
  }
  }

  async updateNickname(req,res,next) { 
    try { 
      const errors = validationResult(req)
      if(!errors.isEmpty()) { 
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, oldNickname, newNickname} = req.body
      const user = await authService.updateNickname(email, oldNickname, newNickname)
      return res.json(user)
    } catch(e) { 
      next(e)
    }
  }
  async updateEmail(req,res,next) { 
    try { 
      const errors = validationResult(req)
      if(!errors.isEmpty()) { 
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, newEmail} = req.body
      const user = await authService.updateEmail(email, newEmail)
      return res.json(user)
    } catch(e) { 
      next(e)
    }
  }
  async changePassword(req,res,next) { 
    const errors = validationResult(req)
    if(!errors.isEmpty()) { 
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }
    try { 
      const {email, oldPassword, newPassword, confirmPassword} = req.body
      await authService.changePassword(email, oldPassword, newPassword, confirmPassword)
      return res.json({message:'Ваш пароль был успешно изменён'})
    } catch(e) { 
      next(e)
    }
  }
}

module.exports = new AuthController()