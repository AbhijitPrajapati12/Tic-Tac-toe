console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let player1 = "";
let player2 = "";

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    let winnerDeclared = false;
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = (boxtext[e[0]].innerText === "X" ? player1 : player2) + " Won";
            isgameover = true;
            winnerDeclared = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });

    if (!winnerDeclared) {
        let draw = true;
        Array.from(boxtext).forEach(element => {
            if (element.innerText === "") {
                draw = false;
            }
        });
        if (draw) {
            document.querySelector('.info').innerText = "It's a Draw!";
            isgameover = true;
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + (turn === "X" ? player1 : player2);
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + player1;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementById('inputContainer').classList.remove('hidden');
});

// Add onclick listener to start button
document.getElementById('start').addEventListener('click', () => {
    player1 = document.getElementById('player1').value || "Player 1";
    player2 = document.getElementById('player2').value || "Player 2";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + player1;
    document.getElementById('inputContainer').classList.add('hidden');
});