module.exports.isLoggedIn = (req , res , next) =>{
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(500).json('unauthorized')
    }
}


