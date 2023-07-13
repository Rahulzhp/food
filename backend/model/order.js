const mongoose = require("mongoose");

const OrderShema = mongoose.Schema({
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
    quantities: [{ type: Number }],
    totalPrice: { type: Number },
    estimatedDeliveryTime: { type: String },
})

const Order = mongoose.model("Order", OrderShema)

module.exports = {
    Order
}