const userController = require("../contoller/user.controller")
const auth = require("../../middleware/auth")
const router = require("express").Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("", userController.allUsers)
router.get("/profile", auth, userController.profile)
router.post("/logoutAll", auth, async (req, res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send("logged out")
    }
    catch(e) {
        res.send(e)
    }
})
router.post("/logout", auth, async (req, res)=>{
    req.user.tokens = req.user.tokens.filter(t=>t.token!=t.token)
    await req.user.save()
    res.send("logged out")
})

module.exports=router