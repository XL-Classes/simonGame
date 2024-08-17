// 
// 1st step -> keypress -> gameStart 
// 2nd step -> & level 1 and button flash
// 3rd step -> Button press by user -> check -> user seq <-> game seq , if seq same Level up and different Game over.

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScore = document.querySelector("p");
let highLevel = 0;

document.addEventListener("click", function () {
    if (started == false) {
        console.log("Game is started.");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 300);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);
    // console.log(randomColor);
    // console.log(randomIdx);
    // console.log(randombtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
}

function checkAns(idx) {
    // console.log("current level : ", level);
    // let idx = level-1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if(level > highLevel){
            highLevel = level;
            highScore.innerHTML = `Highest  Score : ${highLevel}`;
        }
        h2.innerHTML = `Game Over ! Your Score was ${level}. <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}