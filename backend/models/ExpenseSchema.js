const mongoose = require("mongoose")

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  Expense: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  Catogery:{
    type:string,
    default: null
  },
  Amount: {
    type: Number,
    required: true
  },
  Creation_Date: {
    type: Date,
    default: Date.now
  },
})

const ExpenseModel = mongoose.mode("Expense",ExpenseSchema)

module.exports =ExpenseModel