const baseUrl =
  "https://rockpaperscissors-adeb0-default-rtdb.europe-west1.firebasedatabase.app/scoreboard";
getAll();
const gamerName = document.querySelector("input");
const startBtn = document.querySelector("#start-btn");
const header = document.querySelector("#header");
const gameContainer = document.querySelector("#game-container");
const playerPointsh3 = document.querySelector("#player-points");
const resultText = document.querySelector("#result-text");
let playerPoints = 0;
let computerPoints = 0;
const array = ["rock", "paper", "scissors"];

document.querySelector("#game-container").style.display = "none";
document.querySelector("#points").style.display = "none";

startBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (gamerName.value == "") {
    document.querySelector("#go").style.display = "none";
    document.querySelector("#error-message").style.display = "block";
  } else {
    document.querySelector("#error-message").style.display = "none";
    document.querySelector("#game-container").style.display = "block";
    document.querySelector("#go").style.display = "block";
    document.querySelector("#go").innerText =
      "Let's go, " +
      gamerName.value +
      "!" +
      " Let's see if you can make the scoreboard...";

    let playerText = document.querySelector("#player-text");
    let computerText = document.querySelector("#computer-text");

    gameContainer.addEventListener("click", function (event) {
      let randomNumber = Math.floor(Math.random() * array.length);
      const userChoice = event.target.id;
      const computerChoice = array[randomNumber];

      if (event.target.tagName === "BUTTON") {
        playerText.innerText = gamerName.value + ": " + userChoice;
        computerText.innerText = "Computer: " + computerChoice;

        if (
          (userChoice == "rock" && computerChoice == "scissors") ||
          (userChoice == "scissors" && computerChoice == "paper") ||
          (userChoice == "paper" && computerChoice == "rock")
        ) {
          playerPoints++;
          resultText.innerText = "Du fick poäng! 🤩";
        } else if (
          (computerChoice == "paper" && userChoice == "rock") ||
          (computerChoice == "rock" && userChoice == "scissors") ||
          (computerChoice == "scissors" && userChoice == "paper")
        ) {
          computerPoints++;
          resultText.style.fontSize = "50px";
          resultText.innerText = "Datorn vann, spelet är över! 🤥";
        } else if (userChoice == computerChoice) {
          resultText.innerText = "Ingen fick poäng!";
        }
      }

      playerPointsh3.innerText = "DINA POÄNG: " + playerPoints;

      if (computerPoints == 1) {
        playerPointsh3.style.display = "none";
        document.querySelector("#points").style.display = "block";
        document.querySelector("#points").innerText =
          "DU FICK " + playerPoints + " POÄNG!";
        winner();
        getScore();
      }
    });
  }
});

function winner() {
  computerPoints = 0;

  const btns = document.querySelectorAll(".game-btns");
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.display = "none";
  }

  const restartBtn = document.createElement("button");
  gameContainer.appendChild(restartBtn);
  restartBtn.innerText = "PLAY AGAIN";
  restartBtn.addEventListener("click", function () {
    location.reload();
  });
}

//här börjar koden för firebase/highscore
//hämtar spelarens poäng
function getScore() {
  const newScore = {
    name: gamerName.value,
    score: playerPoints,
  };
  compareScore(newScore);
}

//spelarens poäng jämförs med poängen längst ned på topplistan
async function compareScore(userScore) {
  const url = baseUrl + "/4.json";

  const response = await fetch(url);
  const data = await response.json();

  if (userScore.score <= data.score) {
    console.log("did not make the scoreboard");
  } else {
    console.log("points added to database and scoreboard");
    putScore(userScore).then(getAll);
  }
}

//om spelarens poäng är högre än poängen längst ned på listan, skickas spelarens poäng in till databasen
async function putScore(obj) {
  const url = baseUrl + "/4.json";
  const init = {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, init);
  const data = await response.json();
}

// hämtar data från firebase och sorterar så högst värde ligger längst upp
async function getAll() {
  const url = baseUrl + ".json";

  const response = await fetch(url);
  const data = await response.json();

  const sortData = data.sort(function (a, b) {
    return b.score - a.score;
  });
  putSortedData(sortData);
}

//skickar sorterade topplitsan till databasen
async function putSortedData(obj) {
  const url = baseUrl + ".json";

  const init = {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetch(url, init);
  const data = await response.json();

  showScoreboard(data);
}

//skapar topplistan med info från databasen

function showScoreboard(info) {
  const scoreBoardContainer = document.querySelector("#scoreboard");
  scoreBoardContainer.innerText = "";
  const listContainer = document.createElement("div");
  const scoreBoard = document.createElement("ol");
  listContainer.append(scoreBoard);
  listContainer.style.border = "5px solid #838862";
  scoreBoardContainer.append(listContainer);
  let counter = 0;

  info.forEach((element) => {
    counter++;
    const { name, score } = element;

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");

    const h1 = document.createElement("h1");
    h1.innerText = counter + ". " + name;
    h1.classList.add("gamername");

    const h2 = document.createElement("h3");
    h2.innerText = "Score: " + score;

    nameContainer.append(h1);
    listContainer.append(nameContainer, h2);
  });
}
