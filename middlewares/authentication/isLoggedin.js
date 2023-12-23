module.exports.isLoggedIn = (req , res , next) =>{
    if(req.isAuthenticated()) {
        console.log(`${req.user.username} is current user`)
        next()
    } else {
        res.status(500).json('unauthorized')
    }
}


