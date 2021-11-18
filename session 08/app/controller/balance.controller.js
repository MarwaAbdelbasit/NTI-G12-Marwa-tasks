const {MongoClient, ObjectId} = require("mongodb")

const server = require("../server")

class Balance {
    static balanceOperScreen = (req, res) => {
        let transactionType = req.params.type, userId = req.params._id, type=""
        if(transactionType == "withdraw") type = "Withdraw"
        else if(transactionType == "addBalance") type = "Add Balance"
        else res.render("err404", {pageTitle:"error page", err:"type not valid"})
        res.render("balanceOper", {
            pageTitle: "Transaction operations",
            transactionType: type,
            userId
        })
    }

    static balanceOper = (req, res) => {
        let transactionType = req.params.type, userId = req.params._id, type=""
        if(transactionType!="addBalance" && transactionType!="withdraw")
            res.render('err404', { pageTitle:"Not Found",  err:"Requested Transaction Type Not Valid" })
        server.dbconnection((err, client)=>{
            if(err) res.render("err404", {pageTitle:"error page", err:"db not found"})
            client.collection("data").findOne({_id: userId},
                (e, d)=>{
                    if(e) res.render("err404", {pageTitle:"error page", err:"db not found"})
                    if(!d) res.render("err404", {pageTitle:"error page", err:"record not found"})
                    let myTransactions = d.transactions
                    myTransactions.push({transactionType: type, amount: req.body.amount})
                    client.collection("data").updateOne(
                        {_id: userId},
                        {
                            $set: {transactions:myTransactions}
                        }
                    )
                    .then(res=>res.redirect("/"))
                    .catch(e=>res.render("err404", {pageTitle:"error page", err:"db not found"}))
                })
        })
    }
}

module.exports=Balance