const express = require('express')
const app = express()
const connectDB = require("./config/connectDB")
const port = process.env.PORT
const expenseRoutes = require("./routes/expenseRoutes")
const tasksRoutes = require('./routes/tasksRoutes')
const userRoutes = require('./routes/userRoutes')


connectDB();
app.use(express.json())

app.get("/", (req, res) => {
  res.send('DailyFlow working')
})

app.use('/api', expenseRoutes)
app.use('/api', tasksRoutes)
app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})