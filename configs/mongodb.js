const mongoose = require('mongoose');
const DBconfig = ()=> {mongoose.connect('mongodb://localhost:27017/BikeShop', { useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true})
.then(
    console.log('MongoDB connected')
).catch((e) =>{
    console.log('mongo db error' ,e)
})}

module.exports = DBconfig