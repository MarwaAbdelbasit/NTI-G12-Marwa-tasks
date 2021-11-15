// const https = require("https");
// const { on } = require("events");
// const { error } = require("console");
// const url = "https://jsonplaceholder.typicode.com/posts?_limit=12"
// const req = https.request(url, (response)=>{
//     let data =""
//     response.on('data', (part)=>{
//         data += part.toString()
//     })
//     response.on('end', ()=>{
//         const result = JSON.parse(data)
//         console.log(result);
//     })
// })
// req.on('error', (error)=>console.log(error))
// req.end()

const fetch= require("node-fetch");

const response = await fetch('https://jsonplaceholder.typicode.com/posts')
const data = await response.text()

console.log(body);