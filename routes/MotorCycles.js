const express = require("express");
const router = express.Router();
const {
  showAllMotors,
  addNewMotors,
  editMotors,
  deleteMotors,
} = require("../controllers/Motors");

const {cacheError} = require('../middlewares/errorHandlling/cacheError')

//----CHECK IF USER LOGIN
const {isLoggedIn} = require('../middlewares/authentication/isLoggedin')

// ONLY AUTHOR CAN EDIT AND DELETE
const {isMotorAuthor} = require('../middlewares/authentication/isAuthor')


router.get("/motors",  cacheError(showAllMotors));
router.post("/motors", isLoggedIn,cacheError(addNewMotors));
router.put("/motors/:id", isLoggedIn, isMotorAuthor,cacheError(editMotors));
router.delete("/motors/:id", isLoggedIn, isMotorAuthor,cacheError(deleteMotors));

module.exports = router;
