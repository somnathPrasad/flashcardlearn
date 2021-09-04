const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require("path")
const port = process.env.PORT || 3001
app.use(express.json())
app.use(express.static("client/build"))

// mongoose.connect("mongodb+srv://admin-somnath:dxecjjimjUGcCwTB@cluster0.zomkj.mongodb.net/flashcardDb?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex:true   
// });

mongoose.connect('mongodb://localhost:27017/myapp');


const userSchema = new mongoose.Schema({
    email: String,
    // questions:[
    //     {
    //         question:String,
    //         answer:String
    //     }
    // ]
});

const User = new mongoose.model("User", userSchema)


app.post("/login", function(req,res){
    email = req.body;
    User.find({email:email.email}, function(err, result){
        if (result == ""){
            User.create(email, (err,data)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send(data)
                }
            })
        }else{
            res.send(result)
        }
    })
})

app.listen(port, ()=> console.log("Flashcard backend started on Port "+port))
