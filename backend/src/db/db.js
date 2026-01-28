const { default: mongoose } = require("mongoose");

function connectDB(){

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log("MongoDB connected:", err)
    })
}

module.exports = connectDB