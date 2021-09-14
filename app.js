require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejs = require("ejs")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate")

// MIDDLEWARES
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.json())
app.use(session({
    secret: "oZJsYG+)#7kW7",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  email: {
    type:String,
    unique:true
  },
  googleId:{
    type:String,
    unique:true
  },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//PASSPORT GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/flashcard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",(req,res)=>{
    res.render("login")
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);
app.get('/auth/google/flashcard',
passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // console.log(req.user.googleId)
    res.redirect(`/cards/id/${req.user.googleId}`);
  });

app.get("/cards/id/:googleId",(req,res)=>{
    if(req.isAuthenticated()){
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
    }
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
app.listen(3000,()=>{
    console.log("started")
})
