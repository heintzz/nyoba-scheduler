const express = require("express");
const createIncome = require("../controller/incomeController");
const router = express.Router();

router.post("/", createIncome);

module.exports = router;
