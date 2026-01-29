// create server
const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const paymentRoutes = require('./routes/payment.routes')
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // change to your frontend url
    credentials: true,               // important if sending cookies
  })
);

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.use("/api/auth", authRoutes);
app.use('/api/food',foodRoutes)
app.use('/api/payment', paymentRoutes)

module.exports = app;