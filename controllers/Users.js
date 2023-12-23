const passport = require("passport");
const User = require("../models/Users");
const { default: axios } = require("axios");
const baseUrl = process.env.BASE_URL




module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const newUser = new User({ username, role });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      
      return res.status(201).json({ message: "Signup successful" });
    });
  } catch (error) {
    console.error("Error signing up:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser =  (req, res, next) => {
  passport.authenticate  ("local", (error, user, info) => {
    if (error) {
      return res.status(400).json({ error: "Login error" });
    }
    if (!user) {
      return res.status(400).json({ error: "This account does not exist" });
    }

    req.login (user, async (error) => {
      if (error) {
        return res.status(400).json({ error: "Failed to login" });
      }
      if(req.session.passport.user.role === 'viewer') {
       req.session.passport.user.role === 'user'
      }
      console.log( req.session)
      req.session.save((err)=>{
        if(err) {
          res.status(400).json("error to login")
        } else {
          console.log(req.session.passport.user.role)
          return res.status(200).json({ message: "Login successful" });
        }
      })
    });
  })(req, res, next);
};

module.exports.logoutUser = async (req, res) => {
  try {
    req.logOut((err) =>{
      if(err) return res.status(500).json("logout failed")
    }) 
    res.status(200).json("GoodBye");
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Internal server" });
  }
};

module.exports.getAdminPanel = async (req , res) =>{
  console.log(req.session)
   if(req.session.passport.user.role === 'admin') {
   const response = await axios.get(`${baseUrl}/allusers`);
   const usersData = response.data
   res.status(200).json({message:"Welcome to Admin Panel" ,data: usersData})
   } else {
    res.status(403).json("Permission Denied")
   }
}