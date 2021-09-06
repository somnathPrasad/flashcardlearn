require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("client"));
app.use(express.json());
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri);
const userSchema = new mongoose.Schema({
  email: String,
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

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
                    var sendingData = [];
                    sendingData.push(data)
                    res.send(sendingData)
                }
            })
        }else{
            res.send(result)
        }
    })
})

app.post("/addQuestion", (req, res) => {
  var email = req.body.email;
  var data = req.body.data;
  User.findOne({ email: email }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      result.questions.push(data);
      var saved = result.save();
      if (saved !== "") {
        console.log(result);
        res.send(result.questions);
      } else {
        res.send(err);
      }
    }
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
app.listen(port, () =>
  console.log(`Flashcard server started listning on port ${port}`)
);
