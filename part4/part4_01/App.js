const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const router=require('./pathcontroller/blogroutes')

const userrouter=require('./pathcontroller/userRoutes')
const loginRouter=require('./pathcontroller/login')
const logger=require('./utils/logger')
const app=express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs',router)
app.use('/api/users',userrouter)
app.use('/api/login',loginRouter)
if (process.env.NODE_ENV === 'test'){
    const testingRouter = require('./pathcontroller/testrouter')
    app.use('/api/testing',testingRouter)
}

logger.info('Connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{logger.info('Connected to MongoDB')})
    .catch((error)=>{
        logger.err('error connection to MonoDB: ',error.message)
    })



app.use(middleware.unknownendpoint)
app.use(middleware.errorHandler)


module.exports=app