const question = document.getElementById("question")
const answer = document.getElementById("answer")
var questionSet = [];
var questionNo = 0;
var flipCardBtnCount = 0;


function flipCard(){
    if(flipCardBtnCount===1){
        question.style.display = "block"
        answer.style.display = "none"
        try {
            questionNo++;
            makeCards()
          } catch (error) {
            console.log(error)
            openNav()
            questionNo--;
            makeCards()
          }
          flipCardBtnCount = 0;
    }else{
        question.style.display = "none"
        answer.style.display = "block"
        flipCardBtnCount++;
    }
}
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
      const payload = {data:data}
    const options = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(payload)
    }
    // setLoaderAnimation("loader_addQuestion")
    const response = await fetch("/addQuestion/id/"+getId(),options)
    var res = await response.json()
    if(res !== {}){
    //   removeLoaderAnimation("loader_addQuestion")
      closeNav()
      questionSet = res; //this will set the questionSet array back to everything.
    }
  }

  function getId(){
    var link = window.location.href;
    var id = link.split("id/")[1].split("#")[0];
    return id;
  }

window.onload = function(){
    var id = getId()
    getQuestions(id)
}

async function getQuestions(id){
    const options = {
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    }
    const response = await fetch("/questions/id/"+id,options)
    const questions = await response.json()
    if(questions.length > 0){
      questionSet = questions;
      console.log(questionSet)
      makeCards()
    }
  }

  function makeCards(){
    question.innerHTML = questionSet[questionNo].question;
    answer.innerHTML = questionSet[questionNo].answer;
  }

  function handleCheckButton(){
    if(questionSet.length <= 1){
      openNav()
      makeCards()
    }else{    
      try {
        questionNo++;
        makeCards()
      } catch (error) {
        console.log(error)
        openNav()
        questionNo--;
        makeCards()
      }
    }
  }
