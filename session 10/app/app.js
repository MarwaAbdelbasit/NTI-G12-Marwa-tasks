require("dotenv").config()
require("../db/dbconnection")
const express = require("express")

const app = express()
app.use(express.json())

const userRoutes = require("../app/routes/user.routes")
app.use("/api", userRoutes)

app.get("*", (req, res)=> {
    res.status(404).send({
        apiStatus: false,
        message: "api invalid link"
    })
})

module.exports=app