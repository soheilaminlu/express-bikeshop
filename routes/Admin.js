const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  deleteUser,
  editUser,
} = require("../controllers/Admin");

const {cacheError} = require('../middlewares/errorHandlling/cacheError')

router.get("/allusers", cacheError(getAllUsers));
router.post("/adduser", cacheError(addUser));
router.put("/edituser/:username", cacheError(editUser));
router.delete("/deleteuser/:username", cacheError(deleteUser));

module.exports = router;
