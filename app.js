require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.static("client"))
app.use(express.json())
const port = process.env.PORT || 3000
const mongo_uri = process.env.MONGO_URI

mongoose.connect(mongo_uri);
const userSchema = new mongoose.Schema({
    email: String,
    questions:[
        {
            question:String,
            answer:String
        }
    ]
});

const User = new mongoose.model("User", userSchema)

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/client/index.html")
})

app.post("/user",(req,res)=>{
    var email = req.body.email;
    User.find({email:email},function(err,result){
        if(err){
            console.error(err)
        }else{
            if(result !== []){
                console.log("user found!")
                res.send(result)
            }else{
                res.send("no user found")
            }
        }
    })
})

app.post("/addQuestion",(req,res)=>{
    var email = req.body.email;
    var data  = req.body.data;
    User.findOne({email:email},function(err,result){
        if(err){
            console.error(err)
        }else{
            result.questions.push(data)
            var saved = result.save()
            if(saved !== ""){
                console.log(result)
                res.send(result.questions)
            }else{
                res.send(err)
            }
        }
    })
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})
app.listen(port, ()=> console.log(`Flashcard server started listning on port ${port}`))