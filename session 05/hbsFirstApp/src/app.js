const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const staticDir = path.join(__dirname, "../public");
const layoutsDir = path.join(__dirname, "../frontend/layouts");
const viewsDir = path.join(__dirname, "../frontend/views");

app.use(express.static(staticDir));
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(layoutsDir);

app.get("", (req, res)=>{res.render("home")});
app.get("/about", (req, res)=>{res.render("about")});

module.exports = app