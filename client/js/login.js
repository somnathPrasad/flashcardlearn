var loginForm = document.getElementById("loginForm")
var email = "";


function handleLoginFormSumbit(e){
    e.preventDefault();
    email = document.getElementById("email").value;
    sendUserData(email)
}

loginForm.addEventListener("submit", handleLoginFormSumbit)

async function sendUserData(data){
  var payload = {email:data}
  const options = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(payload)
  }
  const response = await fetch("/user",options)
  const userData = await response.json()
  if(userData !== {}){
    showCards(userData)
  }
}

function showCards(data){
  sessionStorage.setItem("email",data[0].email)
  sessionStorage.setItem("questions",JSON.stringify(data[0].questions))
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("content").style.display = "block"
  getQuestions()
}


