const mongoose = require("mongoose");
const foodModel = require("./food.model");

const foodCategory = new mongoose.Schema({
 
 
    categoryName:{
        type:string,
        required: true
    },

    categoryImage:{
        type:string,
        required: true
    },
    categoryTitle:{
        type:string,
        required: true
    },
    categoryDescription:{
        type:string,
        required: true
    },

})

const foodItemCategory = mongoose.model("categpry", foodCategory);

module.exports = foodItemCategory;