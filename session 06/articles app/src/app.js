require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

const path = require("path");

const app = express();

app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname, "../front/views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../front/layouts"));

const postsRouter = require("../routes/posts.routes");
app.use(postsRouter);

app.get('*', (req, res)=>{res.render("err404", {pageTitle: "error page", err: "page not found"})});

module.exports = app