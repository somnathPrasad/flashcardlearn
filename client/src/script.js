export function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("page").style.marginLeft = "100vh";
  }
  
function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
   document.getElementById("page").style.marginLeft = "0";
}


function showContent(e){
    document.getElementById("main").style.display = "block"
    document.getElementById("email-container").style.display = "none"
    document.getElementById("newCard").style.display = "block"
}

export function addNewCard(){
    var newCard = document.getElementById("newCard")
    newCard.style.height = "100vh"
}

export default showContent;