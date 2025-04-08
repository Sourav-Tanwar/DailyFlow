const express = require('express')
const router = express.Router()
const { getExpense } = require("../controllers/expenseControllers")


router.get('/Expense', getExpense);

module.exports = router