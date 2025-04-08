const Expense = require('../models/ExpenseSchema');


const getExpense = async (req, res) => {
  try {
    const allExpenses = await Expense.find();

    if (!allExpenses || allExpenses.length == 0) {
      res.json({
        message: "No Expenses added yet."
      })
    } else {
      res.status(200).json({
        success: true,
        Expense: allExpenses
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Internal Server Error."
    })
  }
}

module.exports = { getExpense }