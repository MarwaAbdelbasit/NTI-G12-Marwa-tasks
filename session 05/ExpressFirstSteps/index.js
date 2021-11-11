const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const staticDir = path.join(__dirname, "public");

app.use(express.static(staticDir));

app.set("view engine", "hbs");

app.get("", (req, res)=>{
    res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/hbs", (req, res)=>{
    res.render("home");
});

app.listen(PORT, ()=>console.log(`we are on http://localhost:${PORT}`));

