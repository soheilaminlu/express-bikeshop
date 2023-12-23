const Bike = require("../models/Bikes");


module.exports.showAllBikes = async (req, res) => {
  await res.send("successful to show bikes");
  const bikes = await Bike.find({});
  res.status(200).json(bikes);
  if (bikes.length === 0) {
    res.status(404).json("We have not any bikes for you");
  }
};

module.exports.addNewBikes = async (req, res) => {
  try {
    const { name, size, price, categories, imageUrl } = req.body;
    const newBike = new Bike({ name, size, price, categories, imageUrl , author:req.user._id });
    await newBike.save();
    await  newBike.populate('author').execPopulate()
    res.status(200).json({message:"Bike is added successfuly" ,  newbike: newBike});
  } catch (e) {
    res.status(500).json("Internal server");
  }
};

module.exports.editBikes = async (req, res) => {
  try {
    const  bikeId  = req.params.id;
    const updateBike = await Bike.findByIdAndUpdate(
      bikeId,
      req.body,
      { new: true }
    );

    if (!updateBike) {
      return res.status(404).json({ error: "Bike not found" });
    }
    res.status(200).json({ message: "Your bike updated successfully", updatedBike: updateBike });
  } catch (e) {
    res.status(500).json({ error: "Failed to update" });
  }
};

module.exports.deleteBikes = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const deleteBike = await Bike.findByIdAndDelete(bikeId);
    res.status(200).json({message:"Bike deleted successfuly",message1: deleteBike});
  } catch (e) {
    res.status(500).json({ e: "Failed to delete" });
  }
};
