const express = require('express')
const app = express()
const connectDB = require("./config/connectDB")
const port = process.env.PORT
const expenseRoutes = require("./routes/expenseRoutes")
const tasksRoutes = require('./routes/tasksRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors");


connectDB();
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.send('DailyFlow working')
})

app.use('/api', expenseRoutes)
app.use('/api', tasksRoutes)
app.use('/api', userRoutes)
app.get('/healthz', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})