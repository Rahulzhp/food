const express = require("express")

const { Order } = require("../model/order")

const OrderRoute = express.Router()


OrderRoute.get("/", async (req, res) => {
    try {
        let post = await Order.find()
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})
OrderRoute.get("/:id", async (req, res) => {
    try {
        let post = await Order.findById(req.params.id)
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})


OrderRoute.post("/add", async (req, res) => {
    let data = req.body
    try {
        let project = new Order(data)
        await project.save()
        res.send("posted")

    } catch (er) {
        console.log("er", er)
    }
})

OrderRoute.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await Order.findByIdAndUpdate({ _id: id }, payload);
        res.send("edited");
    } catch (err) {
        res.send(err);
    }
});

OrderRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Order.findByIdAndDelete({ _id: id });
        res.send("deleted");
    } catch (err) {
        res.send(err);
    }
});

module.exports = {
    OrderRoute
}