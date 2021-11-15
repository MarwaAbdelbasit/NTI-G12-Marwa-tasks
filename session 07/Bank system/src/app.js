require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

const path = require("path");

const app = express();

app.use(express.urlencoded({extended:true}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../front/views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../front/layouts"));

const appRouter = require("../routes/app.routes");
app.use(appRouter);

app.get('*', (req, res) => res.render("err404", {pageTitle:"error page", err:"page not found", backLink:""}));

module.exports=app


