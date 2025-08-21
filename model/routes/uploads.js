const express = require('express') ;

const router = express.Router();

const { uploads } = require("../controller/uploads")

router.route("/").post(uploads);

module.exports = router;