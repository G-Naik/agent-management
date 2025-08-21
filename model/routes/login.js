const express = require("express") 

const router = express.Router() ; 

const {userlogin} = require('../controller/userlogin')

router.route("/").post(userlogin)
module.exports = router;