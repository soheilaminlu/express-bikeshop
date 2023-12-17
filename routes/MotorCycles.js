const express = require("express");
const router = express.Router();
const {
  showAllMotors,
  addNewMotors,
  editMotors,
  deleteMotors,
} = require("../controllers/Motors");

const {cacheError} = require('../middlewares/errorHandlling/cacheError')


router.get("/motors",  cacheError(showAllMotors));
router.post("/motors", cacheError(addNewMotors));
router.put("/motors/:id", cacheError(editMotors));
router.delete("/motors/:id", cacheError(deleteMotors));

module.exports = router;
