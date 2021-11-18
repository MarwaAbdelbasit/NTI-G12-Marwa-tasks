const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        trim:true
    },
    email:{
        type:String,
        required: [true, "Email is Required"],
        unique: [true, "Email used before"],
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Invalid Email Format")
        }
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        trim:true
    },
    tokens:[
        {token:{type:String, required:true}}
    ]
})

//function to hide some data
userSchema.methods.toJSON = function(){
    const user = this
    let myDeleted = ["__v"]
    myDeleted.forEach(d=> delete user[d])
    return user
}

//function to encrypt passsword
userSchema.pre("save", async function() {
    const user = this
    if(user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8)
})

userSchema.statics.loginUser = async (email, password) => {
    //search for user with entered email
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const isValid = await bcrypt.compare(password, userData.password)
    if(!isValid) throw new Error("invalid password")
    return userData
}

userSchema.methods.generateToken = async function() {
    const userData = this
    const token = jwt.sign({_id:userData.id}, "helloAll")
    userData.tokens = userData.tokens.concat({token})
    userData.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User