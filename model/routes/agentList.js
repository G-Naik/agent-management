const express = require("express")

const router = express.Router();

const {agentList} = require("../controller/agentList");

router.route("/").get(agentList);

module.exports = router;