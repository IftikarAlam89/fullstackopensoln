const blogRouter=require("express").Router()
const middleware = require('../utils/middleware')
const logger = require('../utils/logger')
const Blog= require('../models/blogs')
const User= require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set("useFindAndModify", false)
blogRouter.use(middleware.tokenExtractor)


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs.map(blog=>blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    console.log("here")
    const body= request.body
    console.log(body)
    console.log("Potatogear")
    const decodedToken = jwt.verify(request.token,process.env.SECRET)

    if (!request.token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    if (!body.likes){
        body.likes=0
    }
    console.log(body)

    if(body.title && body.author && body.url){
        const user = await User.findOne({name:body.author.toLowerCase()})
        console.log(user)
        const blog = new Blog({
            title: body.title,
            author: body.author.toLowerCase(),
            url: body.url,
            likes: body.likes,
            user: mongoose.Types.ObjectId(user._id)
        })
        const result= await blog.save()

        user.blogs=user.blogs.concat(result._id)

        await user.save()
        response.status(201).json(result.toJSON())
    }else {
        logger.err("Missing title and/or author")
        response.status(400).end()
    }
   })

blogRouter.delete('/:id', async (request, response) => {
    const id_ = request.params.id
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.findById(id_)
    if(blog) {

        const ver = await jwt.verify(request.token, process.env.SECRET)


        if (ver.id === blog.user.toString()) {
            await Blog.findByIdAndRemove(id_)
        } else {
            return response.status(401).json({error: 'You dont have permission to delete this blog'})
        }
    }else{
        return response.status(401).json({error: 'No such blog exists'})
    }


    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const entry = request.body
    if (entry.title && entry.author && entry.url){
        const newEntry={
            title: entry.title,
            author: entry.author,
            url: entry.url,
            likes: entry.likes ? entry.likes :0
        }
        const id_ = request.params.id
        const result = await Blog.findByIdAndUpdate(id_,newEntry,{ new: true })
        return response.status(200).json(result.toJSON())
            //
    }else{
        logger.err("Missing title and/or author")
        response.status(400).end()
    }

})

module.exports=blogRouter

