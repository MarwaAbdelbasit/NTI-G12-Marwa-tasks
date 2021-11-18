const {MongoClient, ObjectId} = require("mongodb")

const server = require("../server")

class Customer {
    static homeScreen = (req, res) => {
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").find().toArray((err, data)=>{
                if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
                res.render("home", {
                    pageTitle: "Home",
                    data,
                    noData: data.length==0?true:false
                })
            })
        })
    }

    static addCustomerScreen = (req, res) => {
        res.render("addCustomer", {
            pageTitle: "Add new customer"
        })
    }

    static addCustomerLogic = (req, res) => {
        let user = {...req.body, transactions:[]}
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").insertOne(user, (e, r)=>{
                if(e) res.render("err404", {pageTitle:"error page", err:"db not found"})
                res.redirect("/")
            })
        })
    }

    static delete = (req, res)=>{
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").deleteOne({_id:new ObjectId(req.params._id)})
            .then(r=>res.redirect("/"))
            .catch(e=>res.render("err404", {pageTitle:"error page", err:"record not found"}))
        })
    }

    static delAll = (req, res) => {
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").deleteMany()
            .then(r=>res.redirect("/"))
            .catch(e=>res.render("err404", {pageTitle:"error page", err:"db not found"}))
        })
    }

    static showSingle = (req, res) => {
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").findOne({_id:new ObjectId(req.params._id)},
            (e, d)=>{
                if(e) res.render("err404", {pageTitle:"error page", err:"db not found"})
                if(!d) res.render("err404", {pageTitle:"error page", err:"record not found"})
                res.render("showSingle", {pageTitle:d.fname, user:d, noTransactions:d.transactions.length==0?true:false})
            })
        })
    }

    static

}

module.exports=Customer