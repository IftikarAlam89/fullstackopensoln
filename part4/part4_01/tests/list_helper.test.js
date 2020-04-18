const listHelper = require('../utils/list_helper')

describe('dummy',()=>{
    test('dummy returns one', ()=>{
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('likeTester',()=>{
    test('count of empty array',()=>{
        const blogs =[]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    }),

    test('count of single item',()=>{
        const blogs =[{
            "title":"This is the third blog",
            "author":"samidha Kushwaha",
            "url":"iftikaralam2.com",
            "likes":7
        }]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(7)
    }),

        test('count of three items',()=>{
            const blogs = [
                {
                    _id: "5a422a851b54a676234d17f7",
                    title: "React patterns",
                    author: "Michael Chan",
                    url: "https://reactpatterns.com/",
                    likes: 7,
                    __v: 0
                },
                {
                    _id: "5a422aa71b54a676234d17f8",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 5,
                    __v: 0
                },
                {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 12,
                    __v: 0
                },
                {
                    _id: "5a422b891b54a676234d17fa",
                    title: "First class tests",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                    likes: 10,
                    __v: 0
                },
                {
                    _id: "5a422ba71b54a676234d17fb",
                    title: "TDD harms architecture",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                    likes: 0,
                    __v: 0
                },
                {
                    _id: "5a422bc61b54a676234d17fc",
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    likes: 2,
                    __v: 0
                }
            ]
            const result = listHelper.totalLikes(blogs)
            expect(result).toBe(36)
        })

})




describe('mostBlog',()=>{

    test('count of single item',()=>{
        const blogs =[{
            "title":"This is the third blog",
            "author":"samidha Kushwaha",
            "url":"iftikaralam2.com",
            "likes":7,
            "_id":90,
            "__v":2
        }]
        const result = listHelper.mostBlogs(blogs)
        const res={"author":"samidha Kushwaha",
            "blogs":1}

        expect(result).toEqual(res)
    }),

        test('count of three items',()=>{
            const blogs = [
                {
                    _id: "5a422a851b54a676234d17f7",
                    title: "React patterns",
                    author: "Michael Chan",
                    url: "https://reactpatterns.com/",
                    likes: 7,
                    __v: 0
                },
                {
                    _id: "5a422aa71b54a676234d17f8",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 5,
                    __v: 0
                },
                {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 12,
                    __v: 0
                },
                {
                    _id: "5a422b891b54a676234d17fa",
                    title: "First class tests",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                    likes: 10,
                    __v: 0
                },
                {
                    _id: "5a422ba71b54a676234d17fb",
                    title: "TDD harms architecture",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                    likes: 0,
                    __v: 0
                },
                {
                    _id: "5a422bc61b54a676234d17fc",
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    likes: 2,
                    __v: 0
                }
            ]
            const res=  {"author": "Robert C. Martin",
                "blogs": 3
        }
            const result = listHelper.mostBlogs(blogs)
            expect(result).toEqual(res)
        })

})

describe('mostLiked',()=>{

    test('count of single item',()=>{
        const blogs =[{
            "title":"This is the third blog",
            "author":"samidha Kushwaha",
            "url":"iftikaralam2.com",
            "likes":7,
            "_id":90,
            "__v":2
        }]
        const result = listHelper.mostLikes(blogs)
        const res=blogs[0]
        delete res.__v
        delete res._id
        delete res.url
        delete res.title
        expect(result).toEqual(res)
    }),

        test('count of three items',()=>{
            const blogs = [
                {
                    _id: "5a422a851b54a676234d17f7",
                    title: "React patterns",
                    author: "Michael Chan",
                    url: "https://reactpatterns.com/",
                    likes: 7,
                    __v: 0
                },
                {
                    _id: "5a422aa71b54a676234d17f8",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 5,
                    __v: 0
                },
                {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 12,
                    __v: 0
                },
                {
                    _id: "5a422b891b54a676234d17fa",
                    title: "First class tests",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                    likes: 10,
                    __v: 0
                },
                {
                    _id: "5a422ba71b54a676234d17fb",
                    title: "TDD harms architecture",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                    likes: 0,
                    __v: 0
                },
                {
                    _id: "5a422bc61b54a676234d17fc",
                    title: "Type wars",
                    author: "Robert C. Martin",
                    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                    likes: 2,
                    __v: 0
                }
            ]
            const res=  {"author": "Edsger W. Dijkstra",
                "likes": 17
            }
            const result = listHelper.mostLikes(blogs)
            expect(result).toEqual(res)
        })

})