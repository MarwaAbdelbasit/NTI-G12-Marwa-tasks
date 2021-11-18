require("dotenv").config()

const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "../public")))
app.set("views", path.join(__dirname, "../frontend/views"))
hbs.registerPartials(path.join(__dirname, "../frontend/layouts"))

app.use(express.urlencoded({extended:true}))

app.use(require("../routes/balance.routes"))
app.use(require("../routes/customer.routes"))

app.get("*", (req, res)=>res.render("err404", {pageTitle:"error page", err:"not found"}))

module.exports=app