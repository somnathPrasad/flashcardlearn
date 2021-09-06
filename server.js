const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json())
const port = process.env.PORT || 3000


mongoose.connect('mongodb+srv://admin-somnath:dxecjjimjUGcCwTB@cluster0.zomkj.mongodb.net/flashcardDb?retryWrites=true&w=majority');

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

app.get("/", function(req,res){
  res.render("login")
})

app.post("/user", function(req,res){
    email = req.body.email;
    question = {question:"What is ISRO?", answer:"ISRO stands for Indian Space Research Organization. It is a highly efficient and productive indian space program."}
    newUser = {
        email:req.body.email,
        questions:[question]
    }
    User.find({email:email}, function(err, result){
        if (result == ""){
            User.create(newUser, (err,data)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.render("cards")
                }
            })
        }else{
            res.render("cards",{email:email})
        }
    })
})

app.post("/api/cards", function(req,res){
    receivedEmail = req.body.email
    if(receivedEmail !== undefined){
        User.find({ email: `${receivedEmail}`}, function (err, docs) {console.log(docs)});
    }
})


app.listen(port, ()=> console.log("Flashcard backend started on Port "+port))
