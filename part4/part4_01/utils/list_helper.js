const lodash =require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    const reducer = (sum, blog) =>{
        return sum+blog.likes
    }
    return blogs.length===0 ? 0 : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        const maxi = max.likes < blog.likes ? blog:max
        delete maxi.__v
        delete maxi.__id
        delete maxi.url
        return maxi
    }

    return blogs.reduce(reducer,blogs[0])
}

const mostBlogs =(blogs) =>{
    const mostblogged=lodash(blogs).countBy('author').toPairs().orderBy([1],['desc']).value()[0]
    return {"author":mostblogged[0],"blogs":mostblogged[1]}

}

const mostLikes = (blogs) =>{
    const mostLiked=lodash(blogs).groupBy('author').map(
        (items,key)=>({'author':key,
            'likes': lodash.sumBy(items,'likes')})).orderBy(['likes'],['desc']).value()[0]
    return mostLiked

}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}