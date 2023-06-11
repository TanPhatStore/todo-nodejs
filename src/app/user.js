

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema ({
    userName : {type : String},
    passWord : {type : String},
    accessControl  : {type : Boolean}
})

module.exports = mongoose.model('users', User)