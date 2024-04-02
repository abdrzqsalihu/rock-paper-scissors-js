let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

// if (!score) {
// if (!score) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   }
// }

let isAutoplaying = false;
let intervalId;

// const autoPlay = () => {

// };
function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
    document.querySelector(".autoplay-score-button").innerHTML =
      "Pause Auto Play";
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    document.querySelector(".autoplay-score-button").innerHTML = "Auto Play";
  }
}

document.querySelector(".rock-button").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".paper-button").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".scissors-button").addEventListener("click", () => {
  playGame("scissors");
});
document.querySelector(".reset-button").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
});
document.querySelector(".autoplay").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "d") {
    clearInterval(intervalId);
    isAutoplaying = false;
    document.querySelector(".autoplay-score-button").innerHTML = "Auto Play";
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  }

  // console.log(event.key);
});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}
document.querySelector(".reset-button").addEventListener("click", () => {
  // Update the click event listener to
  // show the confirmation message instead
  // of restting the score immediately.
  showResetConfirmation();
});

// Function for showing the confirmation message.
function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
      Are you sure you want to reset the score? <br /><br />
      <button class="js-reset-confirm-yes reset-confirm-button" style="cursor:pointer">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button" style="cursor:pointer">
        No
      </button>
    `;

  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove == "scissors") {
    if (computerMove == "rock") {
      result = "You lose.";
    } else if (computerMove == "paper") {
      result = "You win.";
    } else if (computerMove == "scissors") {
      result = "Tie.";
    }
  } else if (playerMove == "paper") {
    if (computerMove == "rock") {
      result = "You win.";
    } else if (computerMove == "paper") {
      result = "Tie.";
    } else if (computerMove == "scissors") {
      result = "You lose.";
    }
  } else if (playerMove == "rock") {
    if (computerMove == "rock") {
      result = "Tie.";
    } else if (computerMove == "paper") {
      result = "You lose.";
    } else if (computerMove == "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateResultElement();
  updateScoreElement();
  updateMoveElement();

  //       alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);

  function updateMoveElement() {
    document.querySelector(".js-moves").innerHTML = `You picked
<img src="img/${playerMove}-emoji.png" class="move-icon" alt="">
Computer picked
<img src="img/${computerMove}-emoji.png" class="move-icon" alt="">`;
  }
}

function updateResultElement() {
  document.querySelector(".js-result").innerHTML = `${result}`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
