//Modal
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector(".fas.fa-times")
  const showGameBtn = document.querySelector("#buttonGame")

  showGameBtn.addEventListener('click', () => {
      modal.style.display = 'block'
  });
  modalCloseBtn.addEventListener('click', () => {
      modal.style.display = 'none'
  });


(function() {
  console.log('mini-game');  

// Botton - show game
// =================================
  const buttonGame = document.getElementById('buttonGame');
  const email   = document.getElementById('email');
  const gameDIV = document.getElementsByClassName('game')[0];
  const userName= document.querySelector(".userName");
  let user = '';

  function showGameDiv() {
      gameDIV.style.transition = "height 3.0s linear 0s";
      gameDIV.style.height = '470px';
  }

// button - show gameDIV
  buttonGame.addEventListener('click', function() {
      showGameDiv();
  });


// FORM
// ==================================
  var form = document.querySelector('#mail__form');
  form.onsubmit = function(e) {
      let email = this.email,
          checkbox = this.checkbox,
          message = document.getElementById('message'),
          msg = "";
      if(email.value === "") {
          msg += "Wypełnij pole email <br/>";
      }
      if(email.value !== "") {
          let reg = /\S+@\S+\.\S+/;
          test = reg.test(email.value);
          if(!test) {
              msg += "Wpisz poprawnie adres email <br/>";
          } else {
            user = email.value;
          }
      }
      if(!checkbox.checked) {
          msg += "Zaznacz zgodę warunków bezpieczeństwa"
      }
      if(msg === "") {
          message.classList.remove("messageError");
          message.classList.add("messageSuccess");
          message.innerHTML = "Form sended...";

          console.log(user);
          let userInStarage = localStorage.getItem(user);
          if(userInStarage) {
            showGameDiv();
            getStorageScore(user);
          } else {
            showGameDiv();
          }
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


// INPUT 
// ==================================
  email.addEventListener('keyup', function() {
    console.log(email.value);
    let userInStarage = localStorage.getItem(email.value);
    if(userInStarage) {
      console.log('Jest taki mail');
      userName.textContent = email.value;
      console.log(userInStarage);
      buttonGame.disabled = false;
      user = email.value;
      getStorageScore(user);
    } else {
      console.log('Brak takiego maila');
      console.log(localStorage.getItem(email.value));
      buttonGame.disabled = true;
    }
  });


// MINI-GAME version 2.0
// ==================================

// Declear
  const jumperDiv    = document.getElementById("jumperDiv");
  const jumperButton = document.getElementById("jumperButton");
  const startButton  = document.getElementById("startButton");
  const resetButton  = document.getElementById("resetButton");
  let yourScoreFinal = document.getElementById("yourScoreFinal");
  let yourScore      = document.getElementById("yourScore");
  let levelShow      = document.getElementById("levelShow");
  let speedGame = 20;
  let lastScore = 0;
  let score = 0;
  let jumper;
  let walls = [];
  let boardGame;
  let hitBottomStatus = true;
  let hitTopStatus = true;
  let countPress = 0;

// Jumper's hit - control boolean
  function hitBottomFalse() {
      hitBottomStatus = false;
  }
  function hitBottomTrue() {
      hitBottomStatus = true;
  }
  function hitTopFalse() {
      hitTopStatus = false;
  }
  function hitTopTrue() {
      hitTopStatus = true;
  }

// Wall
  function Wall(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedUp = 0;
    this.cumulationSpeed = 0;
    this.update = function () {
      let ctx = boardGame.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
  }

  // Jumper
  class Jumper {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.color = color;
      this.speedUp = 0;
      this.cumulationSpeed = 0; 
      this.crashSound = true;
    }
    update = function () {
      let ctx = boardGame.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    newPos = function () {
      this.y += this.speedUp;
      this.hitBottom();
      this.hitTop();
    };
    hitTop = function () {
      if(this.y < 50 && countPress <= 1) {
        this.speedUp = 2.0;
      }
      if (this.y < 0) {
        console.error("Too hight");
        this.y = 0;
        if(hitTopStatus) {
          hitTopFalse(); 
          var yes = new Audio("./game/knock.wav");
          yes.play();
          this.speedUp = 2.0;  
        }
      }
    };
    hitBottom = function () {
      var jumpBottom = boardGame.canvas.height - this.height;
      if (this.y > jumpBottom) {
        this.y = jumpBottom;
        this.cumulationSpeed = 0;
        if(hitBottomStatus) {
          console.error("Hit bottom");  
          var yes = new Audio("./game/knock.wav");
          yes.play();
          hitBottomFalse();  
          countPress = 0;         
        }
      }
    };
    crash = function (wallObj) {
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var otherleft = wallObj.x;
      var otherright = wallObj.x + wallObj.width;
      var othertop = wallObj.y;
      var otherbottom = wallObj.y + wallObj.height;
      var crash = true;
      if (
        mybottom < othertop || mytop > otherbottom ||
        myright < otherleft || myleft > otherright
        ){
          crash = false;
        } else {
        clearInterval(boardGame.interval);
        if(this.crashSound) {
          hit.play();
          this.crashSound = false;
        }
        resetButton.disabled = false;
        jumperButton.disabled = true;
        jumperButton.style.color = '#666';
        if (boardGame.counter > lastScore) {
          lastScore = boardGame.counter;
          yourScoreFinal.innerText = boardGame.counter;
          savaStorage(lastScore);
        }
        return crash;
      }
    };
  }

// getStorageScore
  const getStorageScore = function(user) {
    let lastScoreStorage = localStorage.getItem(user);
    if(lastScoreStorage) {
      lastScore = lastScoreStorage;
      yourScoreFinal.textContent = lastScore;    
    } else {
      yourScoreFinal.textContent = 0; 
    }
  }

// savaStorage
  const savaStorage = function(lastScore) {
    let lastScoreStorage = localStorage.getItem(user);
    if(lastScore > lastScoreStorage) {
      localStorage.setItem(user, lastScore);
    }
  }

// actual Score
  function showActualScore(actualScore) {
    score = actualScore;
    yourScore.textContent = " Actual score: " + score;
  }

// change Level
  function changeLevel(level) {
    console.log('New Level: ', `Level ${level}`, speedGame, score);
    levelShow.textContent = level;
    boardGame.startInterval();
    reached.play(); 
  }

// difficulty
  function increasingDifficulty() {
    if(score === 1000) {
      speedGame = 15;
      clearInterval(boardGame.intervalId);
      changeLevel(2);
    }
    if(score === 2000) {
      speedGame = 10;
      clearInterval(boardGame.intervalId);
      changeLevel(3);
    }
    if(score === 3000) {
      speedGame = 8;
      clearInterval(boardGame.intervalId);
      changeLevel(4);
    }
    if(score === 4000) {
      speedGame = 6;
      clearInterval(boardGame.intervalId);
      changeLevel(5);
    }
    if(score === 5000) {
      speedGame = 5;
      clearInterval(boardGame.intervalId);
      changeLevel(6);
    }
    if(score === 6000) {
      speedGame = 4;
      clearInterval(boardGame.intervalId);
      changeLevel(7);
    }
    if(score === 7000) {
      speedGame = 3;
      clearInterval(boardGame.intervalId);
      changeLevel(8);
    }
    if(score === 8000) {
      speedGame = 2;
      clearInterval(boardGame.intervalId);
      changeLevel(9);
    }
    if(score === 9000) {
      speedGame = 1;
      clearInterval(boardGame.intervalId);
      changeLevel(10);
    }
  }

// update Board Game
  function updateBoardGame() {
    var x, height;
    for (i = 0; i < walls.length; i += 1) {
      if (jumper.crash(walls[i])) {
        return;
      }
    }
    boardGame.clear();
    boardGame.counter += 1;
    if (boardGame.counter == 1 || (boardGame.counter / 300) % 1 == 0) {
      x = boardGame.canvas.width;
      height = 200;                                        // height = height from Top
      let wall = new Wall(40, 70, "darkgreen", x, height); // width heightWall color x heightFromTop // heightWall => (heightWall + height) = boardGame.canvas.width (270) 
      walls.push(wall);
    }
    for (i = 0; i < walls.length; i += 1) {
      walls[i].x += -1;
      walls[i].update();
    }
    showActualScore(boardGame.counter);
    jumper.newPos();
    jumper.update();
    increasingDifficulty();
  }

// cumulation Speed
  function addCumulationSpeed(n) {
    jumper.speedUp = n;
  }

// Board Game = 480 x 270
  boardGame = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      jumperDiv.appendChild(this.canvas);
      this.counter = 0;
      this.intervalId = null;
    },
    startInterval: function () {
      this.intervalId = setInterval(updateBoardGame, speedGame);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };

// for styleJump - bind
  function binded() {
    styleJump();
  }

// button Jump - style
  function styleJump() {
    this.style.color = 'yellow';  
    this.style.fontWeight = 'bold';    
    setTimeout(() => {
      this.style.color = 'white'; 
      this.style.fontWeight = 'normal'; 
    }, 200);
    snd.play();
  }

// Control game by mouse-button & space
  function controlGame() {

    jumperButton.onclick = function () {
      addCumulationSpeed(-2.0);
      countPress++;
      console.log(countPress);
      hitBottomTrue();
      hitTopTrue();
      const binded = styleJump.bind(jumperButton);
      binded();
    };

    document.onkeyup = function (event) {
      jumperButton.onclick = null;
      let key_press = String.fromCharCode(event.keyCode);
      if (key_press == " ") {
        addCumulationSpeed(-2.0);
        countPress++;
        console.log(countPress);
        hitBottomTrue();
        hitTopTrue();
        styleJump.call(jumperButton);
      }
    };
  }

// start Board
  function startBoard() {
    boardGame.start();
    getStorageScore(user);
  }

// start Game
  function startGame(event) {
    boardGame.startInterval();
    jumper = new Jumper(30, 40, "orange", 20, 100); // width height color left heightDrop
    jumper.speedUp = 2.0;
    score = 0;

    controlGame();
    this.disabled = true;
    jumperButton.disabled = false;
    jumperButton.style.color = '#fff';
    jumperButton.focus();
  }

// reset Game
  function resetGame() {
    boardGame.clear();
    clearInterval(boardGame.intervalId);
    boardGame.counter = 0;
    speedGame = 20;
    level = 1;
    levelShow.textContent = 1;
    showActualScore(boardGame.counter);
    walls = [];
    countPress = 0;
    console.log(countPress);
    startButton.disabled = false;
    this.disabled = true;
  }

// load & start game & reset game
  document.body.onload = startBoard();
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

// Test - it must be deleted
  let but2 = document.querySelector('#but2');
  but2.onclick = function() {
    // reached.play();          
    plum.play();          
  }

})();



















