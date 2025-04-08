const express = require('express')
const app = express()
const connectDB = require("./config/connectDB")
const port = process.env.PORT
const expenseRoutes= require("./routes/expenseRoutes")

connectDB();


app.get("/",(req,res)=>{
  res.send('DailyFlow working')
})

app.use('/api',expenseRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})