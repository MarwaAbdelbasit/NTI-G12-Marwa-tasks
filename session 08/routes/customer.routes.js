const router = require("express").Router()
const Customer = require("../app/controller/customer.controller")

router.get("", Customer.homeScreen)
router.get("/addCustomer", Customer.addCustomerScreen)
router.post("/addCustomer", Customer.addCustomerLogic)
router.get("/delete/:_id", Customer.delete)
router.get("/delAll", Customer.delAll)
router.get("/showSingle/:_id", Customer.showSingle)

module.exports=router