const express = require("express");
const router = express.Router();
const { loginUser, logoutUser, signupUser } = require("../controllers/Users");
const {cacheError} = require('../middlewares/errorHandlling/cacheError')

router.post("/login", loginUser);
router.post("/signup", cacheError(signupUser));
router.get("/logout", cacheError(logoutUser));

module.exports = router;
