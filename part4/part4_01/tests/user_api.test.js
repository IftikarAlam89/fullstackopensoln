const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/user')
const bcrypt =require("bcrypt")




describe('initial user tests', ()=>{
    beforeEach(async ()=>{
        await User.deleteMany({})
        for (let user of helper.initialUsers){
            const pwd=await bcrypt.hash(user.password, 10)
            const newuser= new User({
                username: user.username,
                name: user.name,
                passwordHash: pwd,
                blogs: []
            })
            await newuser.save()
        }
    })

    test('creation fails with proper statuscode and'+
        ' message if username is invalid',
        async ()=> {

            const newUser = {
                username: "If",
                name: "Iftikar Alam",
                password: "Niger123"
            }

            const resp = await api.post('/api/users').send(newUser).expect(401).expect('content-type',/application\/json/)
            expect(resp.body.error).toContain('invalid username or password')

        })

    test('creation fails with proper statuscode and'+
        ' message if password is invalid',
        async ()=> {

            const newUser = {
                username: "Ifti",
                name: "Iftikar Alam",
                password: "Ni"
            }

            const resp = await api.post('/api/users')
                .send(newUser).expect(401)
                .expect('content-type',/application\/json/ )

            expect(resp.body.error).toContain('invalid username or password')

        })

    test('creation fails with proper statuscode and'+
        ' message if both username and password are invalid',
        async ()=> {

            const newUser = {
                username: "If",
                name: "Iftikar Alam",
                password: "Ni"
            }

            const resp = await api.post('/api/users')
                .send(newUser).expect(401)
                .expect('content-type',/application\/json/ )

            expect(resp.body.error).toContain('invalid username or password')

        })


    afterAll(()=>{
        mongoose.connection.close()
    })


})





