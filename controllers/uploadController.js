module.exports.uploadController = (req , res) =>{
    imageUrl = `/uploads/${req.file.filename}`
    res.json(imageUrl)
}