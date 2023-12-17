const User = require('../models/Users');
const Bike = require('../models/Bikes');
const MotorCycle = require('../models/Motors')

// -----ACTIONS FOR USERS TABLE--------
module.exports.getAllUsers = async (req , res , next) => {
try{
    const allUsers = await User.find({});
    res.status(200).json({message:"Users Find Succesfuly" , users : allUsers});
} catch {
res.status(404).json("User Does Not Find");
}
}

module.exports.addUser = async (req , res , next) =>{
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required' });
        }
         const addUser = new User({ username });
        const registeredUser = await User.register(addUser, password);
        req.login(registeredUser, (error) => {
          if (error) {
            return next(error);
          }
          return res.status(201).json({ message: 'Added successful' });
        });
      } catch (error) {
        console.error('Error Adduser:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports.editUser = async (req , res , next) => {
    try{
const {username} = req.params;
const {newUserName , newPassword , newRole} = req.body;
const updatedUser = User.findOneAndUpdate({username})
if(!updatedUser) {
    res.status(404).json("Not Found User");
}
if(newUserName) {
    updatedUser.username = newUserName;
} else if(newPassword) {
    updatedUser.password = newPassword;
}
await updatedUser.save();
res.status(200).json("User Updated Successfuly")
    } catch (error) {
        res.status(500).json({error:"Internal Server"})
    }
}


module.exports.deleteUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const deletedUser = await User.findOneAndDelete({ username });

        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully' });
        }

        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//-----ACTIONS FOR BIKES TABLE------

module.exports.addNewBikes = async (req , res ) =>{
    try{
    const {name , size , price , type} = req.body
    const newBike = new Bike({name , size , price ,categories , imageUrl});
    await newBike.save();
    res.status(200).json("Bike is added successfuly");
    }catch (e) {
     res.status(500).json({e:"Internal server" });
    }
}

module.exports.editBikes = async (req , res) =>{
    try {
      const bikeId = req.params.id
    const updateBike = Bike.findByIdAndUpdate(bikeId);
    await updateBike.save();
    res.status(200).json("your bike updated successfuly")
    }catch (e) {
        res.status(500).json({e:"failed to Update"})
    }
    }

    module.exports.deleteBikes = async (req , res) =>{
        try{
        const bikeId = req.params.id
        const deleteBike =await Bike.findByIdAndDelete(bikeId);
        res.status(200).json("Bike deleted successfuly" , deleteBike);
        }catch(e) {
            res.status(500).json({e:"Failed to delete"});
        }
      }

// ------ACTIONS FOR MOTORCYCLES TABLE-------

module.exports.addNewMotors = async (req , res ) =>{
    try{
    const {name , price , type} = req.body
    const newMotor = new MotorCycle({name , price , type});
    await newMotor.save();
    res.status(200).json("Bike is added successfuly");
    }catch (e) {
     res.status(500).json({e:"Internal server" });
    }
}

module.exports.editMotors = async (req , res) =>{
    try {
      const motorId = req.params.id
    const updateMotor = MotorCycle.findByIdAndUpdate(motorId);
    await updateMotor.save();
    res.status(200).json("your bike updated successfuly")
    }catch (e) {
        res.status(500).json({e:"failed to update"})
    }
    }
    
    module.exports.deleteMotors = async (req , res) =>{
        try{
        const motorId = req.params.id
        const deleteMotor =await MotorCycle.findByIdAndDelete(motorId);
        res.status(200).json("bike deleted successfuly" , deleteMotor)
        }catch(e) {
            res.status(500).json({e:"failed to delete"})
        }
     }
