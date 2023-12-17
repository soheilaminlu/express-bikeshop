const express = require("express");
const {
  showAllBikes,
  addNewBikes,
  editBikes,
  deleteBikes,
} = require("../controllers/Bikes");
const router = express.Router();

const {cacheError} = require('../middlewares/errorHandlling/cacheError')

router.get("/bikes", cacheError(showAllBikes));
router.post("/bikes", cacheError(addNewBikes));
router.put("/bikes/:id", cacheError(editBikes));
router.delete("/bikes/:id", cacheError(deleteBikes));

module.exports = router;
