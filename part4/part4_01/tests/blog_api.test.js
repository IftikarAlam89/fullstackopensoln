const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blogs')



beforeEach(async () =>{
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs){
        let BlogObj =new Blog(blog)
        await BlogObj.save()
    }
})

describe("for all",()=>{
    test('blogs are returned as json', async ()=>{
        const res = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
        expect(res.toJSON()).toBeDefined()
    })
})

describe("for posting",()=>{
    test('post test', async ()=>{
        const newBlog={
            title: "This is test blog",
            author: "sammy",
            url: "iffisammy.com",
            likes: 1
        }
        const ret = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(ret.body.title).toEqual(newBlog.title)
        expect(ret.body.author).toEqual(newBlog.author)
        expect(ret.body.url).toEqual(newBlog.url)
        expect(ret.body.likes).toEqual(newBlog.likes)
        expect(ret.body.blogs).toEqual([])
        const blogsAtEnd =await helper.blogsinDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    })

    test('likes default', async ()=>{
        const newBlog={
            title: "This is likes default blog",
            author: "sammy",
            url: "iffisammy.com"
        }
        const ret = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(ret.body.likes).toEqual(0)
    })

    test('bad request', async ()=>{
        const newBlog={
            author: "sammy",
            likes: 2
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

    })
})

describe("single item update and delete",()=>{
    test("update",async ()=>{
        const allblogs= await helper.blogsinDB()
        const firstblog= allblogs[1]
        const id_=firstblog.id
        const newEntry={
            title: "This is updated",
            author: firstblog.author,
            url: "iffisammy.com",
            likes: firstblog.likes
        }

        const res = await api.put(`/api/blogs/${id_}`).send(newEntry).expect(200)
            //.expect(204)
        //console.log(res.body)
        expect(res.body.likes).toEqual(firstblog.likes)

    })

    test("deletion",async ()=>{
        const allblogs= await helper.blogsinDB()
        const firstblog= allblogs[0]
        const id_=firstblog.id
        await api.delete(`/api/blogs/${id_}`).expect(204)
        const endCount = await  helper.blogsinDB()
        expect(endCount).toHaveLength(helper.initialBlogs.length-1)
        const ids=endCount.map(blog=>blog.id)
        expect(ids).not.toContain(id_)
    })


})


afterAll(()=>{
    mongoose.connection.close()
})

