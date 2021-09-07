var questionNo = 0;
var questionSet = [];
var crossButtonCount = 0;
var removedQuestionIndex = [];

function openNav() {
    document.getElementById("newCard").style.width = "100%";
    document.getElementById("main").style.marginLeft = "100%";
    document.getElementById("main").style.display = "none"
  }
  
function closeNav() {
   document.getElementById("newCard").style.width = "0";
   document.getElementById("main").style.marginLeft = "0";
   document.getElementById("main").style.display = "block"
}


//triggers on Adding a new question
function addQuestion(){
  var newQuestion = document.getElementById("newQuestion").value;
  var newAnswer = document.getElementById("newAnswer").value
  if(newQuestion==="" || newAnswer===""){
    alert("First type question and answer");
  }else{
    var newQuestionSet = {
      "question":newQuestion,
      "answer":newAnswer
    }
    sendQuestionSet(newQuestionSet)
  }
}

async function sendQuestionSet(data){
  var payload = {email:sessionStorage.getItem("email"),data:data}
  const options = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(payload)
  }
  setLoaderAnimation("loader_addQuestion")
  const response = await fetch("/addQuestion",options)
  var res = await response.json()
  if(res !== {}){
    removeLoaderAnimation("loader_addQuestion")
    closeNav()
    questionSet = res; //this will set the questionSet array back to everything.
    removedQuestionIndex.forEach(index=>{  
      questionSet.splice(index,1) //removing questions that were previously removed from question set
    })
  }
}

//triggers from login.js file when user login
function getQuestions(){
  questionSet = JSON.parse(sessionStorage.getItem("questions"))
  makeCard(questionSet) 
}

function makeCard(questionSet){
  var questionHtml = document.getElementById("question");
  var answerHtml = document.getElementById("answer");
  questionHtml.innerHTML = questionSet[questionNo].question;
  answerHtml.innerHTML = questionSet[questionNo].answer;
}

function handleCheckButton(){
  if(questionSet.length <= 1){ //if there is only one question in the array
    openNav()
    makeCard(questionSet)
  }else{     //if there are more than one question
    try {
      questionSet.splice(questionNo, 1); //remove the question from questionSet
      removedQuestionIndex.push(questionNo) //storing the index of removed question to use it when questionSet array is refreshed
      makeCard(questionSet)
    } catch (error) {
      console.log(error)
      questionNo--;
    }
  }
}
function handleCrossButton(){
  crossButtonCount++;
  if(crossButtonCount === 2){
    try {
      questionNo++;
      console.log(questionNo)
      makeCard(questionSet)
    } 
    catch (error) {
      questionNo=0;
      makeCard(questionSet)
      console.log(error)
    }
    finally{
      crossButtonCount = 0;
      document.getElementById("answer").style.display = "none"
    }
  }else{
    document.getElementById("answer").style.display = "block"
  }
}