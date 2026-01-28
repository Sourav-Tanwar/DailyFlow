const mongoose = require("mongoose")

const { Schema } = mongoose;

const TaskSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,

  },
  status: {
    type: String,
    default: "Pending"
  },
  Creation_Date: {
    type: Date,
    default: Date.now
  },
  Due_Date: {
    type: Date,
    default: Date.now
  },
  Updation_Date: {
    type: Date,
    default: Date.now
  },
  Completion_Date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("Tasks", TaskSchema)
