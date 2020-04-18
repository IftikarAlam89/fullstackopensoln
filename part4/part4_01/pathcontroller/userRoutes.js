const logger = require('../utils/logger')
const Blog= require('../models/blogs')
require('express-async-errors')
const mongoose = require('mongoose')
mongoose.set("useFindAndModify", true)
const User=require('../models/user')
const bcrypt =require("bcrypt")
const userRouter = require("Express").Router()

userRouter.get('/',async (request,response)=>{

    const users= await User.find({}).populate('blogs',{url:1,title:1,author:1})
    if (!users){
        return response.status(201).json({error:"No users"})
    }else {
        response.json(users.map(u => u.toJSON()))
    }

})

userRouter.post('/',async (request,response)=> {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const usrNmflag = body.username && body.username.length >= 3
    const passWdflag = body.password && body.password.length >= 3
    if (usrNmflag && passWdflag) {
        const user = new User({
            username: body.username,
            name: body.name.toLowerCase(),
            passwordHash: passwordHash,
            blogs:[]

        })
        const savedResp = await user.save()

        response.json(savedResp.toJSON())
    } else {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
})

userRouter.delete('/:id',async(request, response)=>{
    const id_ = request.params.id
    await User.findByIdAndRemove(id_)
    response.status(204).end()
})





module.exports =userRouter