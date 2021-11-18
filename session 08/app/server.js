const {MongoClient, ObjectId} = require("mongodb")

class Server {
    static dbconnection = (callback) => {
        MongoClient.connect("mongodb://localhost:27017", {}, (err, client)=>{
            if(err) return callback(err, false);
            const myClient = client.db("bankdb")
            callback(false, myClient)
        })
    }
}

module.exports=Server