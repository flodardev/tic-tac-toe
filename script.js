// Game board module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return [...board];
  }

  function placeMarker(index, playerMarker) {
    if (board[index] === "") {
      board[index] = playerMarker;
      return true;
    } else {
      return false;
    }
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return {
    getBoard,
    placeMarker,
    resetBoard,
  };
})();

// The "brains"
const gameController = (() => {
  const playerOne = createPlayer("Dudu", "X");
  const playerTwo = createPlayer("Bubu", "O");

  let activePlayer = playerOne;
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (index) => {
    if (isGameOver) {
      // game is over
      return;
    } else if (gameBoard.placeMarker(index, activePlayer.marker)) {
      // check if its a winning move if not then switch players
      if (winCheck()) {
        // winner
        console.log(`${activePlayer.name} won!`);

        // update score
        activePlayer.setScore();

        isGameOver = true;
      } else if (checkTie()) {
        // its a tie
        console.log("It's a tie");
        isGameOver = true;
      } else {
        switchPlayerTurn();
      }
    } else {
      // re promt player to replace
      console.log("That spot is taken! Please try again at another spot.");
    }
  };

  const winCheck = () => {
    let isWon = false;

    const winningRows = [
      [0, 1, 2], // horizontal row
      [3, 4, 5], // horizontal row
      [6, 7, 8], // horizontal row
      [0, 3, 6], // vertical row
      [1, 4, 7], // vertical row
      [2, 5, 8], // vertical row
      [0, 4, 8], // diagonal row
      [2, 4, 6], // diagonal row
    ];

    const currentBoard = gameBoard.getBoard();

    isWon = winningRows.some((row) => {
      const values = [
        currentBoard[row[0]],
        currentBoard[row[1]],
        currentBoard[row[2]],
      ];

      if (values.every((value) => value === values[0] && value !== "")) {
        return true;
      } else {
        return false;
      }
    });

    return isWon;
  };

  const checkTie = () => {
    const currentBoard = gameBoard.getBoard();
    return currentBoard.every((item) => item !== "");
  };

  return {
    getActivePlayer,
    switchPlayerTurn,
    playRound,
    winCheck,
    playerOne,
    playerTwo,
  };
})();

// Display controller module
const displayController = (() => {
  const gameContainer = document.querySelector(".game-container");

  // add event delegation
  gameContainer.addEventListener("click", (event) => {
    if (event.target && event.target.matches(".square")) {
      const index = +event.target.dataset.index;

      // pass it to gamecontroller.playround
      gameController.playRound(index, gameController.getActivePlayer());

      // update screen
      updateScreen();
    }
  });

  // get player cards and update them
  const updatePlayerCards = () => {
    const playerOne = document.querySelector(".player-one");
    playerOne.children[1].textContent = gameController.playerOne.name;
    playerOne.children[2].textContent = `Score: ${gameController.playerOne.getScore()}`;

    const playerTwo = document.querySelector(".player-two");
    playerTwo.children[1].textContent = gameController.playerTwo.name;
    playerTwo.children[2].textContent = `Score: ${gameController.playerTwo.getScore()}`;
  };

  // create divs for squares of the game board
  const displayScreen = () => {
    const currentBoard = gameBoard.getBoard();
    currentBoard.forEach((item, index) => {
      const square = document.createElement("div");
      square.textContent = item;
      square.classList.add("square");

      // use data attributes to "link" to html
      square.setAttribute("data-index", index);

      // append to the game container
      gameContainer.append(square);
    });
  };

  const updateScreen = () => {
    const currentScreen = document.querySelectorAll(".square");
    const currentBoard = gameBoard.getBoard();
    currentScreen.forEach((item, index) => {
      item.textContent = currentBoard[index];
    });

    // update player cards
    updatePlayerCards();
  };

  return { displayScreen };
})();

// Factory function for player
function createPlayer(name, marker) {
  let score = 0;

  const setScore = () => (score += 1);

  const getScore = () => score;

  return { name, marker, setScore, getScore };
}

// Game starts
displayController.displayScreen();
