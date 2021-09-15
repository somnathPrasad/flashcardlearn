const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./model")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI);


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://flashcardlearn.herokuapp.com/auth/google/flashcard", //   http://localhost:3000/auth/google/flashcard
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({googleId:profile.id},function(err,result){
      if(result === null){
        question = {question:"What is ISRO?", answer:"ISRO stands for Indian Space Research Organization. It is a highly efficient and productive indian space program."}
        newUser = {
        email:profile.emails[0].value,
        googleId:profile.id,
        questions:[question]
        }
        User.create(newUser, (err,user)=>{return cb(err,user)})
      }else{
        return cb(err,result)
      }
    })
  }
));