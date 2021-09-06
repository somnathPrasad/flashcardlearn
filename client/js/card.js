var questionNo = 0;
var questionSet = [];
var crossButtonCount = 0;
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
  const response = await fetch("/addQuestion",options)
  var res = await response.json()
  if(res !== {}){
    closeNav()
    questionSet = res;
  }
}

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
  questionNo++;
  makeCard(questionSet)
}
function handleCrossButton(){
  crossButtonCount++;
  if(crossButtonCount === 2){
    questionNo++;
    makeCard(questionSet)
    crossButtonCount = 0;
    document.getElementById("answer").style.display = "none"
  }else{
    document.getElementById("answer").style.display = "block"
  }
}