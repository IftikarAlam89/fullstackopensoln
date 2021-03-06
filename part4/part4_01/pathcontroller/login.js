const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const middleware = require('../utils/middleware')
loginRouter.use(middleware.userAdder)
const User = require('../models/user')

loginRouter.post('/', async (request, response ) =>{
    const body = request.body
    console.log(body)
    const user = await User.findOne({ "name":body.name.toLowerCase()})
    const passwordCorrect = user===null ? false : await bcrypt.compare(body.password, user.passwordHash)
    console.log("here")
    if (!(user && passwordCorrect)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }


    const token = await jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({token, username:user.username, name:user.name})
})

module.exports = loginRouter