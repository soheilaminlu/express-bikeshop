const mongoose = require('mongoose')
const Schema = mongoose.Schema


const montorCycleSchema = new Schema({
    name:String,
    price:Number,
    categories:{
        type:String,
        Enum:['street' , 'road'],
        default:'street'
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    } , 
    imageUrl:String
})

module.exports = mongoose.model('Motor' , montorCycleSchema)
