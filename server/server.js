require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./models/sequelize')

const AuthRouter = require('./router/AuthRouter')
const DbRouter = require('./router/DbRouter')

const ErrorMiddleware = require('./middlewares/ErrorMiddleware')

const PORT = process.env.PORT || 5001
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use('/auth', AuthRouter)
app.use('/db', DbRouter)
app.use(ErrorMiddleware)


const start = async () => {
  try {
    sequelize.sync()
      .then(() => {console.log('БД синхронизирована')})
      .catch((e) => {console.log(e)})
    app.listen(PORT, () => {console.log(`app is running on  port ${PORT}`)})
  } catch (e) { 
    console.log(e)
  }
}
start()