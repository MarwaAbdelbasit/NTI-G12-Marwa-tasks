const router = require("express").Router();
const appController = require("../contoller/app.controller");

router.get("/", appController.home);
router.get("/addClient", appController.addClient);
router.post("/addClient", appController.addClientLogic);
router.get("/delClient/:accNum", appController.delClient);
router.get("/drawBalance/:accNum", appController.drawBalance);
router.post("/drawBalance/:accNum", appController.drawBalanceLogic);
router.get("/addBalance/:accNum", appController.addBalance);
router.post("/addBalance/:accNum", appController.addBalanceLogic);
router.get("/showSingle/:accNum", appController.showSingle);
router.get("/deleteAll", appController.deleteAll);

module.exports=router