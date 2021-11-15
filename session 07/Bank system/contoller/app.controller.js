const fs = require("fs");
const { normalize } = require("path");
const uniqid = require("uniqid");
const validator = require("validator");

const readFromFile = () => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync("./model/data.json"));
        if(!Array.isArray(data)) throw new Error();
    } catch (error) {
        data = [];
    }
    return data;
}

const writeToFile = (data) => {
    fs.writeFileSync("./model/data.json", JSON.stringify(data));
}

const home = (req, res) => {
    let allData = readFromFile();
    res.render("home", {
        pageTitle: "Home",
        allData,
        noData: allData.length == 0 ? true : false
    });
}

const addClient = (req, res) => {
    res.render("addClient", {
        pageTitle: "Add new client"
    })
}

const addClientLogic = (req, res) => {
    try {
        let allData = readFromFile();
        if(!validator.isEmail(req.body.email)) throw new Error();
        let notUniqEmail = allData.find(c=>c.email==req.body.email)
        if(notUniqEmail) throw new Error();
        let client = {
            name: req.body.name,
            email: req.body.email,
            balance: req.body.balance,
            initialBalance: req.body.balance,
            address: {
                city: req.body.city,
                street: req.body.street,
                buildNum: req.body.buildNum
            },
            accNum: uniqid(),
            transactions: []
        }
        allData.push(client);
        writeToFile(allData);
        res.redirect("/");
    } catch (error) {
        res.render("err404", {pageTitle:"email error page", err:"invalid email or already exist elmohm d5al email gded", backLink:""});
    }
}

const delClient = (req, res) => {
    const allData = readFromFile().filter(c=>c.accNum!=req.params.accNum);
    writeToFile(allData);
    res.redirect("/");
}

const drawBalance = (req, res) => {
    res.render("drawBalance", {
        pageTitle: `Withdraw balance`
    });
}

const drawBalanceLogic = (req, res) => {
    try {
        let allData = readFromFile();
        let index = allData.findIndex(c=>c.accNum==req.params.accNum);
        let client = allData[index]
        if(req.body.amount>client.balance || req.body.amount<100) throw new Error()
        let transDetail = {
            type: "withdraw",
            amount: req.body.amount
        }
        client.transactions.push(transDetail);
        client.balance -= parseInt(req.body.amount);
        allData[index] = client;
        writeToFile(allData);
        res.redirect("/");
    } catch (error) {
        res.render("err404", {pageTitle:"add balance error page", err:"you can only withdraw amount more than 100 and less than your current balance", backLink:"drawBalance/:accNum"});
    }
}

const addBalance = (req, res) => {
    res.render("addBalance", {
        pageTitle: `Add balance`,
    });
}

const addBalanceLogic = (req, res) => {
    try {
        if(req.body.amount<100 || req.body.amount>6000) throw new Error()
        let allData = readFromFile();
        let index = allData.findIndex(c=>c.accNum==req.params.accNum);
        let client = allData[index];
        let transDetail = {
            type: "add balance",
            amount: req.body.amount
        }
        client.transactions.push(transDetail);
        client.balance = +client.balance + parseInt(req.body.amount);
        allData[index] = client;
        writeToFile(allData);
        res.redirect("/");
    } catch (error) {
        res.render("err404", {pageTitle:"add balance error page", err:"you can only add amount more than 100 and less than 6000", backLink:"addBalance/:accNum"});
    }
}

const showSingle = (req, res) => {
    let client = readFromFile().find(c=>c.accNum==req.params.accNum);
    res.render("showSingle", {
        pageTitle: client.name,
        client,
        noTransactions: client.transactions.length==0 ? true : false
    });
}

const deleteAll = (req, res) => {
    writeToFile([]);
    res.redirect("/");
}

module.exports = { 
    home,
    addClient,
    addClientLogic,
    delClient,
    drawBalance,
    drawBalanceLogic,
    addBalance,
    addBalanceLogic,
    showSingle,
    deleteAll
}