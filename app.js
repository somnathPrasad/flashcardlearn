require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejs = require("ejs")
const passport = require("passport")
const port = process.env.PORT || 3000;
const cookieSession = require('cookie-session')
require("./passport_setup")
const User = require("./model")

// MIDDLEWARES
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.json())
app.use(cookieSession({
  name: 'flashcard-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize())
app.use(passport.session())

const isLoggedIn = (req,res,next)=>{
  if(req.user){
    next();
  }else{
    res.sendStatus(401)
  }
}

mongoose.connect(process.env.MONGO_URI);

app.get("/",(req,res)=>{
    res.render("login")
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);

app.get('/auth/google/flashcard',
passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user)
    res.redirect(`/cards/id/${req.user.googleId}`);
  });

app.get("/cards/id/:googleId",isLoggedIn,(req,res)=>{
      var googleId = req.params.googleId;
      User.findOne({googleId:googleId}, function(err, result){
        if(result.questions.length === 0){
          var question = {question:"What is ISRO?", answer:"ISRO stands for Indian Space Research Organization. It is a highly efficient and productive indian space program."}
          result.questions.push(question)
          result.save();
          res.render("card")
        }else{
          res.render("card")
        }
    })
})

app.get("/questions/id/:id",(req,res)=>{
  var id = req.params.id;
  User.findOne({googleId:id}, function(err, result){
    if(result.questions.length !== 0){
      res.send(result.questions)
    }
});
});

app.post("/addQuestion/id/:id", (req, res) => {
  var data = req.body.data;
  User.findOne({ googleId: req.params.id }, function (err, result) {
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
