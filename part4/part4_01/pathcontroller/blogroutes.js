const blogRouter=require("express").Router()
const middleware = require('../utils/middleware')
const logger = require('../utils/logger')
const Blog= require('../models/blogs')
const User= require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set("useFindAndModify", true)
blogRouter.use(middleware.tokenExtractor)


blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs.map(blog=>blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const body= request.body
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    if (!body.likes){
        blog.likes=0
    }
    if(body.title && body.author && body.url){
        const user = await User.findOne({name:body.author.toLowerCase()})
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
    await Blog.findByIdAndRemove(id_)
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

