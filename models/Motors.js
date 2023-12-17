const mongoose = require('mongoose')
const Schema = mongoose.Schema


const montorCycleSchema = new Schema({
    name:String,
    price:Number,
    type:{
        type:String,
        Enum:['street' , 'road'],
        default:'street'
    }
})

module.exports = mongoose.model('Motor' , montorCycleSchema)
