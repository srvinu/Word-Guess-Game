
//initial Variables
var wordArray = ["CAT", "DOG", "LION", "TIGER", "LEOPARD", "BEAR", "CAMEL", "ZEBRA", "PIG", "MONKEY"];
var HintArray = ["Meow", "Woof Woof", "King of the Jungle", "Roar", "Roar with Dots", "Growl", "Hump on my Back", "B&W Stripes", "Oink", "Live in Trees"]
var randWord = wordArray[Math.floor(Math.random() * wordArray.length)];
// console.log("Random Word : " +randWord);
var wordLength = randWord.length;
var underscoreDasher = [];
var dashDisplayer = "";
var display = [wordLength];
// console.log("RandomWord " +randWord+ " length = "+wordLength);
var numGuesses = 10;
var usrWords=[];
var usrLetter = "";
var wordCounter = 0;
var loseCounter = 0;
var scoreWin = 0;
var scoreLost = 0;
// var totalWin = [];
// var latestWinScore = totalWin[totalWin.length -1];
// console.log(latestWinScore)
// var storeWin = sessionStorage.setItem("winScore", latestWinScore)
// var getLatesWinScore = sessionStorage.getItem("winScore");
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];


//Display DASHES to the id dashes
var displayDashes = function () {
  for ( var i = 0; i < wordLength; i++ ){
    underscoreDasher.push("_ ")
  }
  for (var j = 0; j < underscoreDasher.length; j++) {
    dashDisplayer = underscoreDasher[j]+dashDisplayer;
  }
  // console.log(dashDisplayer);
  // console.log(underscoreDasher);
  document.getElementById("dashes").innerHTML = dashDisplayer;
  underscoreDasher = [];
  dashDisplayer = "";

}
//Function to Display Dashes when window loads
window.onload = function () {
    displayDashes();
    if (!sessionStorage.wincount){
      sessionStorage.wincount = "0"
    }
    if (!sessionStorage.losecount){
      sessionStorage.losecount = "0"
    }
    document.getElementById("wins").innerHTML =  sessionStorage.wincount;
    document.getElementById("lost").innerHTML =  sessionStorage.losecount;
    if ( sessionStorage.losecount == "3" ){
      alert("gameover")
      if (document.getElementById("gameover").style.display = "none"){
        document.getElementById("gameover").style.display = "block";
      }
      if (document.getElementById("letsGuess").style.display = "block") {
        document.getElementById("letsGuess").style.display = "none";
      }
      if (document.getElementById("restartbutton").style.display = "none") {
        document.getElementById("restartbutton").style.display = "block";
      }
      if (document.getElementById("title").style.display = "block") {
        document.getElementById("title").style.display = "none";
      }
      if (document.getElementById("rules").style.display = "block") {
        document.getElementById("rules").style.display = "none";
      }

    }
    if ( sessionStorage.wincount == 3 ){
      alert("youwon")
      if (document.getElementById("letsGuess").style.display = "block") {
        document.getElementById("letsGuess").style.display = "none";
      }
      if (document.getElementById("youWon").style.display = "none") {
        document.getElementById("youWon").style.display = "block";
      }
      if (document.getElementById("restartbutton").style.display = "none") {
        document.getElementById("restartbutton").style.display = "block";
      }
      if (document.getElementById("title").style.display = "block") {
        document.getElementById("title").style.display = "none";
      }
      if (document.getElementById("rules").style.display = "block") {
        document.getElementById("rules").style.display = "none";
      }
    }
}

//Main Function for key event
function mainFunction(event) {
  var x = event.key;
  if (!validGuesses.includes(x)){
    alert ("please use valid charectors");
  }
  for (var k = 0; k <  wordLength; k++){
    // alert(randWord[k])
    if (x.toUpperCase() == randWord[k]){
      usrLetter = x.toUpperCase();
      var idx = randWord.indexOf(usrLetter);
      var ndx = idx * 2;
      // alert(ndx);
      // alert (idx);
      // alert("letter match --> " + usrLetter);
      dash = document.getElementById("dashes").innerHTML
      dash = dash.slice(0, ndx) + usrLetter + dash.slice(ndx + 1, dash.length);
      document.getElementById("dashes").innerHTML = dash;
      if (checkRepeat(x) == false){
        console.log("do nothing")
      } else {
        wordCounter++;
      }
    }
     else {
       console.log("dont do anything");
      //  loseCounter++;
      //  alert (loseCounter);
    //   document.getElementById("numOfGuesses").innerHTML = numGuesses;
     }

  }
  if (checkRepeat(x) == false){
    console.log("do nothing")
      } else {
        numGuesses--;
        document.getElementById("numOfGuesses").innerHTML = numGuesses;
      }
  // alert(numGuesses)

  if (wordCounter === wordLength ){
    if(typeof(Storage) !== "undefined") {
      if (sessionStorage.wincount) {
        sessionStorage.wincount = Number(sessionStorage.wincount)+1;
      } else {
        sessionStorage.wincount = 1;
      }
      document.getElementById("wins").innerHTML =  sessionStorage.wincount;
    }
    else {
      document.getElementById("wins").innerHTML = "Sorry, your browser does not support web storage...";
    }
    location.reload();
  }
  if ( numGuesses === 0 ) {
    if(typeof(Storage) !== "undefined") {
      if (sessionStorage.losecount) {
        sessionStorage.losecount = Number(sessionStorage.losecount)+1;
      } else {
        sessionStorage.losecount = 1;
      }
      document.getElementById("lost").innerHTML =  sessionStorage.losecount;
    }
    else {
      document.getElementById("lost").innerHTML = "Sorry, your browser does not support web storage...";
    }
    location.reload();

  }
}
// Function "Restart Game" Button
function restartGame() {
  if (typeof(Storage) !== "undefined") {
    sessionStorage.clear();
    sessionStorage.wincount = 0;
    sessionStorage.losecount = 0;
  }
  location.reload();

}
// Function "Hint" Button
function getHint(){
  var hintIdx = wordArray.indexOf(randWord);
  console.log(hintIdx);
  document.getElementById("giveMeAHint").innerHTML = HintArray[hintIdx];
}
// Avoid Duplicate Chars
function checkRepeat(keyPresses) {
  var letterInBox = document.getElementById("letsGuess").value;
    // console.log("key -->" +keyPresses);
  for (var z = 0; z < letterInBox.length; z++ ){
    if (keyPresses == letterInBox[z]) {
      // console.log("duplicate letter--> "+ keyPresses);
      return false;
    }
  }
}
//Get Rule of the Game Button click

function getRules() {
    alert ("Rules of Game: \n 1.    You have 10 Key Stroke Guesses (Alphabets Only). \n 2.    Game Over when you lose 3 times. \n 3.    You Complete the game, when you win 3 times. \n 4.    Use Hint button if you need help. \n 5.    Restart the game when you lose 3 times or win 3 times. \n 	      Restart Button will appear upon completion.")
}
