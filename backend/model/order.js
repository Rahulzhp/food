const mongoose = require("mongoose");

const OrderShema = mongoose.Schema({
    dishes: [
        {
            dishId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    estimatedDeliveryTime: {
        type: String,
        required: true,
    },
})

const Order = mongoose.model("Order", OrderShema)

module.exports = {
    Order
}