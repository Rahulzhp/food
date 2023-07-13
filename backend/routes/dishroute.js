const express = require("express")

const { Dish } = require("../model/dish")

const DishRoute = express.Router()


DishRoute.get("/", async (req, res) => {
    try {
        let post = await Dish.find()
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})
DishRoute.get("/:id", async (req, res) => {
    try {
        let post = await Dish.findById(req.params.id)
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})


DishRoute.post("/add", async (req, res) => {
    let data = req.body
    try {
        let project = new Dish(data)
        await project.save()
        res.send("posted")

    } catch (er) {
        console.log("er", er)
    }
})

DishRoute.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await Dish.findByIdAndUpdate({ _id: id }, payload);
        res.send("edited");
    } catch (err) {
        res.send(err);
    }
});

DishRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Dish.findByIdAndDelete({ _id: id });
        res.send("deleted");
    } catch (err) {
        res.send(err);
    }
});

module.exports = {
    DishRoute
}