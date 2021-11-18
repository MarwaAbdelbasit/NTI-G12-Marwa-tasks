const userModel = require("../models/user.model")

class User {
    static register = async (req, res) => {
        try {
            const userData = new userModel(req.body)
            await userData.save()
            res.status(200).send({
                apiStatus:true,
                message:"data added successfuly"})
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message})
        }
    }

    static login = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({apiStatus:true, message:"data added successfuly", data: user})
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message})
        }
    }

    static allUsers = async (req, res) => {
        try {
            const allUsers = await userModel.find()
            res.status(200).send({
                apiStatus:true,
                data: allUsers,
                message:"data fetched successfuly"})
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message})
        }
    }

    static profile = async (req, res) => {
        res.send(req.user)
    }
}

module.exports = User