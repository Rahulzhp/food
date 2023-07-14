const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { usersRoute } = require("./routes/userroute")
const { DishRoute } = require("./routes/dishroute")
const { OrderRoute } = require("./routes/orderroute")
const { authenticate } = require("./middleware/auth")
require('dotenv').config()



const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
);


app.get("/", (req, res) => {
    res.send("welcome to FoodApp")
})

app.use("/users", usersRoute)
app.use("/dish", DishRoute)
app.use(authenticate)
app.use("/order", OrderRoute)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to db")

    } catch (er) {
        console.log(er)
    }
    console.log(`server is running in port ${process.env.PORT}`)
})