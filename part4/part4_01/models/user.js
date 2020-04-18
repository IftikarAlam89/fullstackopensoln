const mongoose = require('mongoose')
const uniqueValidator =require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type:String,
        unique: true,
        minlength: 3},
    name: String,
    passwordHash: String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set("toJSON",
    {transform:(document, returnedDoc) =>{
          returnedDoc.id=returnedDoc._id.toString()
            delete returnedDoc._id
            delete returnedDoc.__v
            delete returnedDoc.passwordHash

}
})
userSchema.plugin(uniqueValidator)

const User=mongoose.model('User',userSchema)

module.exports = User