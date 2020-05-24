
(function() {
console.log('mini-game');  

// Botton - show game
const but = document.getElementById('but');
const gameDIV = document.getElementsByClassName('game')[0];

function showGameDiv() {
    console.log('put mail - for game');
    gameDIV.style.transition = "height 3.0s linear 0s";
    gameDIV.style.height = '470px';
}

// button - show gameDIV
but.addEventListener('click', function() {
    showGameDiv();
});

// FORM
// ==================================
var form = document.querySelector('#mail__form');
form.onsubmit = function(e) {
    var email = this.email,
        checkbox = this.checkbox,
        message = document.getElementById('message'),
        msg = "";
    if(email.value === "") {
        msg += "Wypełnij pole email <br/>";
    }
    if(email.value !== "") {
        var reg = /\S+@\S+\.\S+/;
        test = reg.test(email.value);
        if(!test) {
            msg += "Wpisz poprawnie adres email <br/>";
        }
    }
    if(!checkbox.checked) {
        msg += "Zaznacz zgodę warunków bezpieczeństwa"
    }
    if(msg === "") {
        message.classList.remove("messageError");
        message.classList.add("messageSuccess");
        message.innerHTML = "Form sended...";
        showGameDiv();
        // send form - not for real
        // return true;
    } else {
        message.classList.remove("messageSuccess");
        message.classList.add("messageError");
        message.innerHTML = msg;
        // send form stoped
        // return false;  
    }
    e.preventDefault();
};

// MINI-GAME
// =========================

// Declear    
const jumperDiv    = document.getElementById("jumperDiv");
const jumperButton = document.getElementById("jumperButton");
const startButton  = document.getElementById("startButton");
const resetButton  = document.getElementById("resetButton");
let yourScoreView  = document.getElementById("yourScoreFinal");    
let yourScore      = document.getElementById("yourScore"); 
const speedGame = 40;   
let lastScore = 0;   
let score;  
let jumper;
let walls = [];
let boardGame;

function showActualScore(score) {
  yourScore.textContent = " Actual score: " + score;
}

// Board Game
boardGame = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    jumperDiv.appendChild(this.canvas);
    this.frameNo = 0;
    this.interval = null;
  },
};

// start Field
function startField() {
  boardGame.start();
}

// start Game
function startGame() {
  console.log('Start game');
  this.disabled = true;
}

// reset Game
function resetGame() {
  console.log('reset game');
 
  startButton.disabled = false;
  this.disabled = true;
}

// load & start game & reset game
document.body.onload = startField();
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);



})();



















