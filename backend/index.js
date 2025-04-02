const express = require('express')
const app = express()
const connectDB = require("./config/connectDB")
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})