require("dotenv").config();
const PORT = process.env.PORT || 3000;

const hbs = require("hbs");
const express = require("express");
const request = require("request");
const app = express();
app.set("view engine", "hbs");

let apiCall = (cb)=>{
    request (
        {
            url: "https://jsonplaceholder.typicode.com/posts?_limit=10",
            json: true
        },
        (err, res) => {
            if(err) cb(err, false)
            else cb(false, res.body)
        }
    )
}

app.get("", (request, response) => {
    apiCall((e, r)=>{
        if(e) response.render("all", {e})
        else response.render("all", {r})
    });
})

const https = require("https");
const apiHttpsCall = (cb) => {
    const { on } = require("events");
    const { error } = require("console");
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=10"
    const req = https.request(url, (response)=>{
        let data =""
        response.on('data', (part)=>{
            data += part.toString()
        })
        response.on('end', ()=>{
            const result = JSON.parse(data)
            // console.log(result);
            cb(false, result)
        })
    })
    req.on('error', (error)=>{
        // console.log(error)
        cb(error, false)
    })
    req.end()
}

app.get("/api", (req, res)=>{
    apiHttpsCall((e, r)=>{
        if(e) res.render("api", {e})
        else res.render("api", {r})
    })
})

const fetch= require("node-fetch");
app.get("/fetch", async (req, res)=> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    const data = await response.json()
    res.render("fetch", {
        data
    })
})

app.listen(PORT, ()=>console.log(`we are on http://localhost:${PORT}`));