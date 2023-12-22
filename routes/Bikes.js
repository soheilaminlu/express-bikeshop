const express = require("express");
const {
  showAllBikes,
  addNewBikes,
  editBikes,
  deleteBikes,
} = require("../controllers/Bikes");

const router = express.Router();

const {cacheError} = require('../middlewares/errorHandlling/cacheError');

//----CHECK IF USER LOGIN
const {isLoggedIn} = require('../middlewares/authentication/isLoggedin');
//----ONLY AUTHOR CAN EDIT AND DELETE
const {isBikeAuthor} = require('../middlewares/authentication/isAuthor');

router.get("/bikes", cacheError(showAllBikes));
router.post("/bikes", isLoggedIn ,cacheError(addNewBikes));
router.put("/bikes/:id", isLoggedIn, isBikeAuthor, cacheError(editBikes));
router.delete("/bikes/:id", isLoggedIn ,isBikeAuthor,cacheError(deleteBikes));

module.exports = router;
