const mongoose = require("mongoose")

const { Schema } = mongoose;

const TaskSchema = new Schema({
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
  // tag: {
  //   type: String,
  //   default: "General"
  // },
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

// const Tasks = mongoose.model("Tasks", TaskSchema)
// module.exports = Tasks;