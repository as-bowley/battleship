const Player = require("./Player");
const Gameboard = require("./Gameboard");
const Ship = require("./Ship");
const Dom = require("./Dom");

const Gameloop = (() => {
  let player = Player("human");
  let computer = Player("computer");

  const userInterface = Dom();

  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  //the placement of ships to be determined by drag and drop in final ver.

  playerBoard.placeShip("carrier", "vertical", 1, 2);
  playerBoard.placeShip("battleship", "vertical", 3, 0);
  playerBoard.placeShip("destroyer", "vertical", 5, 3);
  playerBoard.placeShip("submarine", "vertical", 7, 6);
  playerBoard.placeShip("patrol boat", "vertical", 0, 0);

  computerBoard.placeShip("carrier", "vertical", 1, 2);
  computerBoard.placeShip("battleship", "vertical", 3, 0);
  computerBoard.placeShip("destroyer", "vertical", 5, 3);
  computerBoard.placeShip("submarine", "vertical", 7, 6);
  computerBoard.placeShip("patrol boat", "vertical", 0, 0);

  userInterface.renderPlayerGameboard(playerBoard);
  userInterface.renderComputerGameBoard(computerBoard);

  //the updating of the gameboards needs to be called every time attack received
  const computerGameBoardCells =
    document.querySelectorAll(".computerBoardCell");

  computerGameBoardCells.forEach(function (cell) {
    cell.addEventListener("click", function (e) {
      const cell = e.target.id;
      const location = cell.split(/\[(-?\d+)\]/);
      const row = location.splice(1, 2).join("");
      const col = location.splice(1, 2).join("");

      computerBoard.receiveAttack(row, col);

      userInterface.updatePlayerGameboard(playerBoard);
      userInterface.updateComputerGameboard(computerBoard);
    });
  });
})();

module.exports = Gameloop;
