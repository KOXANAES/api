const {User} = require('../models/models')
const authService = require('../services/AuthService')
const MailService = require('../services/MailService')

class AuthController { 
  async registration(req,res,next) { 
    try {  
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

}

module.exports = new AuthController()