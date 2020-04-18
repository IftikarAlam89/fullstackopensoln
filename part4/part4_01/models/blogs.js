require('dotenv').config()
const mongoose=require('mongoose')

mongoose.set("useFindAndModify", true)


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set("toJSON",{transform:(org,transformedDoc)=>{
    transformedDoc.id=org._id.toString()
     delete transformedDoc._id
     delete transformedDoc.__v
}})

blogSchema.set("toOUT",{transform:(org,transformedDoc)=>{
        delete transformedDoc._id
        delete transformedDoc.__v
        delete transformedDoc.url
    }})

const Blog = mongoose.model('Blog', blogSchema)

module.exports= Blog


