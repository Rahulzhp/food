const mongoose = require("mongoose");

const DishShema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
})

const Dish = mongoose.model("Dish", DishShema)

module.exports = {
    Dish
}