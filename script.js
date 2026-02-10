// Game board module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return [...board];
  }

  function placeMarker(index, playerMarker) {
    if (board[index] === "") {
      board[index] = playerMarker;
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

// Display controller module
const displayController = (() => {
  return {};
})();

// Facttory function for player
function createPlayer(name, marker) {
  return { name, marker };
}
