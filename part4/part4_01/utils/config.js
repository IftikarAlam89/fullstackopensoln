require('dotenv').config()

let PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'){
    MONGODB_URI=process.env.MONGODB_URI_TEST
}

module.exports = {
    MONGODB_URI,
    PORT
}