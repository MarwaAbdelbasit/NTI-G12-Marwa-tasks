const jwt = require("jsonwebtoken")
const userModel = require("../app/models/user.model")

const auth = async (req, res, next) => {
    try{
        //take token from header
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, "helloAll")
        //find user with the specified decoded token and search for the token in the array of tokens
        const user = await userModel.findOne({_id:decodedToken._id, "tokens.token":token})
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:"unauthorized"})
    }
}

module.exports = auth