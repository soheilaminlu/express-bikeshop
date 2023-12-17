const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bikeSchema = new Schema({
    name:String,
    price:Number,
    categories:{
        type:String,
        Enum:['Street' , 'Road' , 'Kids'],
        default:'Street'
    },
    size:{
        type:Number,
        Enum:[20 , 22 , 24 , 26 , 28]
  },
  imageUrl:String
})

module.exports = mongoose.model('Bike' , bikeSchema)