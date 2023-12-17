const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PassportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
   
    role:{
        type:String,
        Enum:['user' , 'admin' , 'viewer'],
        default:'viewer'
    }
})
userSchema.plugin(PassportLocalMongoose)
 
module.exports = mongoose.model('User' , userSchema )
