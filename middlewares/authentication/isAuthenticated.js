const isAuthenticated = (req , res , next) =>{
    if(req.isAuthenticated()) {
        next()
    } else {
        return res.status(403).json("unauthorized access")
    }
}

module.exports = {
    isAuthenticated
}