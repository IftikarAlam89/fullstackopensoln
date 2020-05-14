const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
    {title: "This is the first blog",
        author: "Iftikar Alam",
        url: "iftikaralam.com",
        likes: 7
    },
    {title: "This is the third blog",
        author: "samidha Kushwaha",
        url: "iftikaralam2.com",
        likes: 7}
]

const initialUsers = [
    {username: "Sammy",
        name: "Samidha Kushwaha",
        password: "Nigel123"},
    {username: "Ifti",
        name: "Iftikar Alam",
        password: "Nigel456"}
]

const blogsinDB = async ()=>{
    const blogs =await Blog.find({}).populate('user')
    return blogs.map(blog=>blog.toJSON())
}

const usersinDB = async ()=>{
    const Users =await User.find({}).populate('blog')
    return Users.map(user=>user.toJSON())
}

module.exports ={
    initialBlogs,initialUsers, blogsinDB, usersinDB
}