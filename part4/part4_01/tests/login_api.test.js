const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./test_helper')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const User = require('../models/user')

test('login occurs if both username and password are correct', async ()=>{
     const entry ={
         name: "Iftikar Alam",
         password: "Nigel456"
     }

     const res = await api.post('/api/login').send(entry)
        .expect(200)
        .expect('Content-Type',/application\/json/)

    console.log(res.body)
     const user = await User.findOne({"username": res.body.username})
     const userForToken = {
        username: res.body.username,
        id: user._id
     }
      const token = jwt.sign(userForToken,process.env.SECRET)

    expect(res.body.token).toEqual(token)
})

test('login fails if username is incorrect', async ()=>{
    const entry ={
        name: "Siggu",
        password: "Nigel456"
    }
    const res = await api.post('/api/login').send(entry)
        .expect(401)

    expect(res.body.error).toContain('invalid username or password')
})

test('login fails if password is incorrect', async ()=>{
    const entry ={
        name: "Ifti",
        password: "Nig"
    }
    const res = await api.post('/api/login').send(entry)
        .expect(401)
    expect(res.body.error).toContain('invalid username or password')
})
