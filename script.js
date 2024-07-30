let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

//Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O " : "X";
};

//Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " won";
      isgameover = true;
      document.getElementsByTagName("img")[0].style.width = "200px";
      gameOver.play();
      e.forEach((index) => {
        // This JavaScript line adds the win class to the parent element of the boxtext element at the specified index in the boxtext HTMLCollection.
        boxtext[index].parentElement.classList.add("win");
      });
    }
  });

  // Check for a draw
  if (!isgameover) {
    let allFilled = true;
    Array.from(boxtext).forEach((element) => {
      if (element.innerText === "") {
        allFilled = false;
      }
    });
    if (allFilled) {
      document.querySelector(".info").innerText = "It's a draw";
      isgameover = true;
      gameOver.play();
    }
  }
};

//* Game Logic
let boxes = document.getElementsByClassName("box"); //Gives HTMLCollection
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (!isgameover && boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add onClick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
    element.parentElement.classList.remove("win");
  });
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0";
});
