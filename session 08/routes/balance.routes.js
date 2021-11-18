const router = require("express").Router()
const Balance = require("../app/controller/balance.controller")

router.get("/balanceOper/:type/:_id", Balance.balanceOperScreen)
router.post("/balanceOper/:type/:_id", Balance.balanceOper)

module.exports=router