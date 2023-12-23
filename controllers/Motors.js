const MotorCycle = require("../models/Motors");

module.exports.showAllMotors = async (req, res) => {
  const motors = await MotorCycle.find({});
  res.status(200).json(motors);
  if (MotorCycle.length === 0) {
    res.status(404).json("we have not any bikes for you");
  }
};

module.exports.addNewMotors = async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const newMotor = new MotorCycle({ name, price, type });
    await newMotor.save();
    res.status(200).json("Motor is added successfuly");
  } catch (e) {
    res.status(500).json({ e: "Internal server" });
  }
};

module.exports.editMotors = async (req, res) => {
  try {
    const motorId = req.params.id;
    const updateMotor = MotorCycle.findByIdAndUpdate(motorId ,req.body , {new:true});
    await updateMotor.save();
    res.status(200).json("your bike updated successfuly");
  } catch (e) {
    res.status(500).json({ e: "failed to update" });
  }
};

module.exports.deleteMotors = async (req, res) => {
  try {
    const motorId = req.params.id;
    const deleteMotor = await MotorCycle.findByIdAndDelete(motorId);
    res.status(200).json("bike deleted successfuly", deleteMotor);
  } catch (e) {
    res.status(500).json({ e: "failed to delete" });
  }
};
