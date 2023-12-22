const express = require("express");
const router = express.Router();
const upload = require("../configs/multer");
const { uploadController } = require("../controllers/uploadController");

const {cacheError} = require('../middlewares/errorHandlling/cacheError');

const {isLoggedIn} = require('../middlewares/authentication/isLoggedin')

router.post("/upload", upload.single("image"), isLoggedIn,cacheError(uploadController));

module.exports = router;
