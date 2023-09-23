const express = require("express");
const createIncome = require("../controller/income");
const router = express.Router();

router.post("/", createIncome);

module.exports = router;
