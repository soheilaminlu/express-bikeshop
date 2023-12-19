const express = require("express");
const {
  showAllBikes,
  addNewBikes,
  editBikes,
  deleteBikes,
} = require("../controllers/Bikes");
const router = express.Router();

const {cacheError} = require('../middlewares/errorHandlling/cacheError')

//----CHECK IF USER LOGIN
const {isAuthenticated} = require('../middlewares/authentication/isAuthenticated')

router.get("/bikes", cacheError(showAllBikes));
router.post("/bikes", isAuthenticated ,cacheError(addNewBikes));
router.put("/bikes/:id", isAuthenticated,cacheError(editBikes));
router.delete("/bikes/:id", isAuthenticated ,cacheError(deleteBikes));

module.exports = router;
