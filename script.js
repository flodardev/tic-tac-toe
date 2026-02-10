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
  const playerOne = createPlayer("Player One", "X");
  const playerTwo = createPlayer("Player Two", "O");

  let activePlayer = playerOne;
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = () => {
    if (isGameOver) {
      // game is over
      return;
    } else if (gameBoard.placeMarker(index, marker)) {
      // check if its a winning move if not then switch players
      if (winCheck()) {
        // winner
        isGameOver = true;
      } else if (checkTie()) {
        // its a tie
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
  };
})();

// Display controller module
const displayController = (() => {
  return {};
})();

// Factory function for player
function createPlayer(name, marker) {
  let score = 0;

  const setScore = () => (score += 1);

  const getScore = () => score;

  return { name, marker, setScore, getScore };
}

gameBoard.placeMarker(0, "X");
gameBoard.placeMarker(1, "X");
gameBoard.placeMarker(2, "X");
console.log(gameController.winCheck());
