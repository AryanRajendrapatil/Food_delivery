require('dotenv').config()   // ← must be FIRST, before any other requires
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const connectDB = require('./models/mongodb_connect')
const foodroutes = require("./routes/foodroutes.js")
const userroutes = require("./routes/userroutes.js")
const cartrouter = require("./routes/cartroute.js")
const orderrouter = require("./routes/orderroute.js")



//middleware
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
  res.send('Hello World!') 
})
connectDB();

app.use("/api/food",foodroutes)
app.use("/images",express.static("uploads"))
app.use("/api/user",userroutes)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderrouter)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})