const express = require('express')

const router = express.Router(); 

const {agentCreation} = require("../controller/agentCreation")

router.route('/').post(agentCreation);

module.exports = router;