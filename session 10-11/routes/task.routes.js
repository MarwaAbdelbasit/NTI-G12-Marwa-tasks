const router = require("express").Router()
const  { generalAuth, userAuth, adminAuth, auth } = require("../middleware/auth")
const taskModel = require("../models/task.model")
router.post('/addTask', auth("User"), async(req,res)=>{
    try{
        const taskDetails = new taskModel({
            ...req.body,
            userId: req.user._id
        })
        await taskDetails.save()
        res.status(200).send({
            apiStatus:true,
            data:taskDetails,
            message: "data Added"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})
router.get('/myTasks', auth("User"), async(req,res)=>{
    try{
        await req.user.populate({
            path:"userTasks",
            options:{
                limit: 10,
                skip: parseInt(req.query.start),
                sort:{_id:-1}
            },
            // match:{title:"t 1"}
        })
        res.status(200).send({
        apiStatus:true,
        message: "data Added",
        data:req.user.userTasks
    })
}
catch(e){
    res.status(500).send({
        apiStatus:false,
        message:e.message
    })
}
})

router.delete('/delMyTasks', auth("User"), async (req, res)=>{
    try{
        let allTasks = await taskModel.deleteMany({userId:req.user._id})
        if(allTasks.length==0) throw new Error("tasks alreader not exist")
        res.status(200).send({
            apiStatus:true,
            message: "task deleted",
            data:req.user
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})

router.patch('/editTask/:taskId', auth("User"), async (req, res)=>{
    try{
        let task = await taskModel.findByIdAndUpdate(req.params.taskId,{$set:req.body})
        if(!task) throw new Error("task not found")
        res.status(200).send({
            apiStatus:true,
            message: "task edited",
            data:task
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})

router.get('/singleTask/:taskId', auth("User"), async (req, res)=>{
    try{
        let task = await taskModel.findById(req.params.taskId)
        if(!task) throw new Error("task not found")
        res.status(200).send({
            apiStatus:true,
            message: "task fetched",
            data:task
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})

router.get('/showTasks', auth("User"), async (req, res)=>{
    try{
        let allTasks = await taskModel.find({userId:req.user._id})
        if(allTasks.length==0) throw new Error("tasks alreader not exist")
        res.status(200).send({
            apiStatus:true,
            message: "tasks fetched",
            data:allTasks
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})


router.get('/adminShowTasks', auth("Admin"), async (req, res)=>{
    try{
        let allTasks = await taskModel.find()
        if(allTasks.length==0) throw new Error("tasks alreader not exist")
        res.status(200).send({
            apiStatus:true,
            message: "tasks fetched",
            data:allTasks
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})

router.delete('/adminRemoveTask/:taskId', auth("Admin"), async (req, res)=>{
    try{
        let task = await taskModel.findByIdAndDelete({_id:req.params.taskId})
        if(!task) throw new Error("task not found")
        res.status(200).send({
            apiStatus:true,
            message: "task deleted"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:e.message
        })
    }
})
module.exports = router