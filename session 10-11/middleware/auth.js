const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const generalAuth = async(req,res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, 'helloAll')
        const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token': token})
        if(!user) throw new Error()
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:"unauthorized", data:e.message})
    }
}
const userAuth = async(req,res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, 'helloAll')
        const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token': token})
        if(!user) throw new Error()
        if(user.role!="User") throw new Error("enta msh user")
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:"unauthorized", data:e.message})
    }
}
const adminAuth = async(req,res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, 'helloAll')
        const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token': token})
        if(!user) throw new Error()
        if(user.role!="Admin") throw new Error("enta msh admin")
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:"unauthorized", data:e.message})
    }
}
const auth = (type)=>{
    return async(req,res,next)=>{
        try{
            const token = req.header("Authorization").replace("Bearer ", "")
            const decodedToken = jwt.verify(token, 'helloAll')
            const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token': token})
            if(!user) throw new Error()
            if(user.role!=type) throw new Error(`enta msh ${type}`)
            req.user=user
            req.token=token
            next()
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:"unauthorized", data:e.message})
        }
    }

}
module.exports = { generalAuth, userAuth, adminAuth, auth }