
(function() {
  console.log('mini-game - Jumper ver 2.2'); 

// Bottons - show/close game & modal
// ========================================
  const modal   = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector("#closeModal")
  const btnShowGame   = document.querySelector("#btnShowGame")
  const email     = document.getElementById('email');
  const gameDIV   = document.getElementsByClassName('game')[0];
  const userName  = document.querySelector(".userName");
  const btnCloseGame = document.querySelector("#closeGame");
  let user = '';
  
//Modal
  modalCloseBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

// control game for Desktop  
  let gameDesktop = null;
  const checkWidthGame = function() {
    let widthGame = window.innerWidth;
    if(widthGame < 768) {
      btnShowGame.style.display = 'none';
      gameDesktop = false;
      closeGame();
    } else {
      btnShowGame.style.display = 'inline-block';
      gameDesktop = true;
    }  
  }
  checkWidthGame();
  document.body.onresize = function() {
    checkWidthGame();
  }

// show DIV game
  function showGameDiv() {
    if(window.innerWidth >= 768 && gameDesktop) {
      gameDIV.style.transition = "height 3.0s linear 0s";
      gameDIV.style.height = '470px';
      setTimeout(() => {
        modal.style.display = 'block';
      }, 3000);            
    }
  }

// close DIV game
  function closeGame() {
    gameDIV.style.transition = "height 3.0s linear 0s";
    gameDIV.style.height = '0px';

    resetScores();
    showYourFinalScore(0);
    showActualScore(0);
    resetGame();

    document.querySelector('#jumperButton').disabled = true;
    document.querySelector('#resetButton').disabled = true;
    email.value = '';

    document.getElementById('confirm').disabled = false;
    btnShowGame.disabled = true;
  }

  btnCloseGame.addEventListener('click', closeGame);

// button - show gameDIV
  btnShowGame.addEventListener('click', function() {
    showGameDiv();
  });


// FORM
// ==================================
  var form = document.querySelector('#mail__form');
  form.onsubmit = function(e) {
      // email.removeEventListener("mousemove", myFunction);
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
          
          // console.log(user);
          let userInStarage = localStorage.getItem(user);
          if(userInStarage) {
            showGameDiv();
            getStorageScore(user);
          } else {
            showGameDiv();
            resetScores();
            saveStorageNewUser(user);
            showYourFinalScore(0);
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


// INPUT - recognize user
// ==================================
  email.addEventListener('keyup', function() {
    let userInStarage = localStorage.getItem(email.value);
    if(userInStarage) {
      // mail yes
      btnShowGame.disabled = false;
      user = email.value;
      getStorageScore(user);
      setNewPlayer(user);      
    } else {
      // mail no
      btnShowGame.disabled = true;
    }
  });


// MINI-GAME version 2.1
// ==================================

// Declear
  const boardDiv     = document.getElementById("boardDiv");
  const jumperButton = document.getElementById("jumperButton");
  const startButton  = document.getElementById("startButton");
  const resetButton  = document.getElementById("resetButton");
  let yourScoreFinal = document.getElementById("yourScoreFinal");
  let yourScore      = document.getElementById("yourScore");
  let levelShow      = document.getElementById("levelShow");
  const dino1 = document.getElementById("dino1");
  const dino2 = document.getElementById("dino2");
  const dino3 = document.getElementById("dino3");

  let speedGame = 20;
  let lastScore = 0;
  let score = 0;
  let jumper;
  let walls = [];
  let boardGame;
  let hitBottomStatus = true;
  let hitTopStatus = true;
  let countPress = 0;
  let intervalOfImages = 0;

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
  class Wall {
    constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedUp = 0;
    this.cumulationSpeed = 0;
    }
    update() {
      let ctx = boardGame.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
  }

  // Jumper & actions: newPosition, update, hitTop, hitBottom, crach
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
      this.dinoRun = 0;
    }
    update() {
      let ctx = boardGame.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // img dino - animation
      let dino;
      if(!hitBottomStatus) {
        if(this.dinoRun < 5) {
          dino = dino1;
          this.dinoRun++;
        } else if(this.dinoRun < 10) {
          dino = dino2;
          this.dinoRun++;
        } else {
          dino = dino2;
          this.dinoRun = 0;
        }        
      } else {
        dino = dino3;
      }
      ctx.drawImage(dino, this.x, this.y, this.width, this.height);

    };
    newPosition() {
      this.y += this.speedUp;
      this.hitBottom();
      this.hitTop();
    };
    hitTop() {
      if(this.y < 50 && countPress <= 1) {
        this.speedUp = 2.0;
      }
      if (this.y < 0) {
        // console.error("Too hight");
        this.y = 0;
        if(hitTopStatus) {
          hitTopFalse(); 
          var yes = new Audio("./game/knock.wav");
          yes.play();
          this.speedUp = 2.0;  
        }
      }
    };
    hitBottom() {
      var jumpBottom = boardGame.canvas.height - this.height;
      if (this.y > jumpBottom) {
        this.y = jumpBottom;
        this.cumulationSpeed = 0;
        if(hitBottomStatus) {
          // console.error("Hit bottom"); 
          var yes = new Audio("./game/knock.wav");
          yes.play();
          hitBottomFalse();  
          countPress = 0;         
        }
      }
    };
    crash(wallObj) {
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
        clearTimeout(intervalOfImages);
        if(this.crashSound) {
          hit.play();
          this.crashSound = false;
        }
        resetButton.disabled = false;
        jumperButton.disabled = true;
        jumperButton.style.color = '#666';
        if (boardGame.counter > lastScore) {
          lastScore = boardGame.counter;
          showYourFinalScore(lastScore);
          savaStorage(lastScore);
        }
        return crash;
      }
    };
  }

// getStorage - score
  const getStorageScore = function(user) {
    let lastScoreStorage = localStorage.getItem(user);
    if(lastScoreStorage) {
      lastScore = lastScoreStorage;
      showYourFinalScore(lastScore); 
    } else {
      showYourFinalScore(0);
    }
  }

// savaStorage - new score
  const savaStorage = function(scoreParam) {
    let lastScoreStorage = localStorage.getItem(user);
    if(lastScoreStorage) {
      if(scoreParam > lastScoreStorage) {
        localStorage.setItem(user, scoreParam);
      }      
    } 
  }

  // saveStorage - new user
  const saveStorageNewUser = function(newUser) {
      localStorage.setItem(newUser, 0);
      // userName.textContent = newUser;
      setNewPlayer(newUser);
  }

// your final score
  function showYourFinalScore(scoreParam) {
    yourScoreFinal.textContent = scoreParam;
  }

// reset Scores
  function resetScores() {
    score = 0;
    lastScore = 0;
  }

// actual Score
  function showActualScore(actualScore) {
    score = actualScore;
    yourScore.textContent = " Actual score: " + score;
  }

// set new player
  function setNewPlayer(newUser) {
    userName.textContent = newUser;
  }

// change Level
  function changeLevel(level) {
    // console.log('New Level: ', `Level ${level}`, speedGame, score);
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
      height = 200;                                        
      let wall = new Wall(40, 70, "green", x, height); // width heightWall color x heightFromTop // heightWall => (heightWall + height) = boardGame.canvas.width (270) 
      walls.push(wall);
    }
    for (i = 0; i < walls.length; i += 1) {
      walls[i].x += -1;
      walls[i].update();
    }
    showActualScore(boardGame.counter);
    jumper.newPosition();
    jumper.update();
    increasingDifficulty();
  }

// cumulation Speed
  function addCumulationSpeed(n) {
    jumper.speedUp = n;
  }

// Board Game = 480 x 270
  class BoardGame {
    constructor() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      this.counter = 0;
      this.intervalId = null;      
    }
    start() {
      boardDiv.appendChild(this.canvas);
    }
    startInterval() {
      this.intervalId = setInterval(updateBoardGame, speedGame);
    }
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

// for styleJump - bind
  function binded() {
    styleJump();
  }

// button Jump - style & play
  function styleJump() {
    this.style.color = 'yellow';  
    this.style.fontWeight = 'bold';    
    setTimeout(() => {
      this.style.color = 'white'; 
      this.style.fontWeight = 'normal'; 
    }, 200);
    snd.play();
  }

// Control game by mouse-left-button & key-space
  function controlGame() {

    const actionControlMouseAndSpace = () => {
      if(countPress <= 1) {
        addCumulationSpeed(-2.0);
        countPress++;
        console.log(countPress);
        hitBottomTrue();
        hitTopTrue();
        const binded = styleJump.bind(jumperButton);
        binded();  
        // styleJump.call(jumperButton);      
      }  
    }

    jumperButton.onclick = function () {
      actionControlMouseAndSpace();     
    };

    document.onkeyup = function (event) {
      jumperButton.onclick = null;
      let key_press = String.fromCharCode(event.keyCode);
      if (key_press == " ") {
        actionControlMouseAndSpace();
      }
    };
  }

// randome images
  function randomShowImages() {
    const arrayImages = ['ground1.jpg', 'ground2.jpg', 'ground3.jpg', 'ground4.jpg', 'ground5.jpg', 'ground6.jpg', 'ground7.jpg', 'ground8.jpg', 'ground9.jpg', 'ground10.jpg', 'ground11.jpg', 'ground12.jpg', 'ground13.jpg', 'ground14.jpg', 'ground15.jpg', 'ground16.jpg', 'ground17.jpg', 'ground18.jpg', 'ground19.jpg', 'ground20.jpg'
  ];
    intervalOfImages = setTimeout(function() {
      randomImage = Math.floor(Math.random() * arrayImages.length);
      boardGame.canvas.style.background = 'url(/game/'+arrayImages[randomImage]+')'; 
      randomShowImages();
    }, 5000);
  }

// start Board
  function startBoard() {
    boardGame = new BoardGame();
    boardGame.start();
    getStorageScore(user);
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
  }

// start Game
  function startGame() {
    jumper = new Jumper(30, 40, "transparent", 20, 100); // width height color left heightDrop    
    jumper.speedUp = 2.0;
    score = 0;    
    boardGame.startInterval();
    controlGame();
    this.disabled = true;
    jumperButton.disabled = false;
    jumperButton.style.color = '#fff';
    jumperButton.focus();
    document.getElementById('confirm').disabled = true;
    btnShowGame.disabled = true;
    randomShowImages();
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
    startButton.disabled = false;
    this.disabled = true;
    document.getElementById('confirm').disabled = false;
    btnShowGame.disabled = false;
    boardGame.canvas.style.background = 'url(/game/trojmiasto.jpg)';
    boardGame.canvas.style.backgroundSize = 'cover';
  }

// load game
  document.body.onload = startBoard();

})();



















