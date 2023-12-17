const express = require("express");
const router = express.Router();
const upload = require("../configs/multer");
const { uploadController } = require("../controllers/uploadController");

const {cacheError} = require('../middlewares/errorHandlling/cacheError')

router.post("/upload", upload.single("image"), cacheError(uploadController));

module.exports = router;
