const mongoose = require("mongoose")

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  expense: {
    type: String,
    required: true
  },
  catogery: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    required: true
  },
  creation_Date: {
    type: Date,
    default: Date.now
  },
})

const Expense = mongoose.model("Expense", ExpenseSchema)

module.exports = Expense