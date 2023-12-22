const Bike = require('../../models/Bikes')
 const Motor = require('../../models/Motors')

module.exports.isBikeAuthor = async (req, res, next) => {
    
    const { id } = req.params;
    const bike = await Bike.findById(id)
    console.log(bike)
    if (bike.author && !bike.author.equals(req.user._id)) {
        res.status(403).json("Author is Not Valid")
    }
    console.log('author is valid')
    next();
};

module.exports.isMotorAuthor = async (req, res, next) => {
    const { id } = req.params;
    const motor = await Motor.findById(id);
    if (motor.author && !motor.author.equals(req.user._id)) {
       res.status(403).json("Author is  Not Valid")
    }
    next();
}

