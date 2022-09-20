const mongoose = require('mongoose');


const FoodSchema = new mongoose.Schema({
    foodName : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    like : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
