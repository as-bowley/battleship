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

  userInterface.renderPlayerGameboard(playerBoard);
  userInterface.renderComputerGameBoard(computerBoard);

  const playerGameBoardCells = document.querySelector(".playerBoardCell");

  //declare all ships with boolean
  //go through each ship with if statement when using mouseover function or onclick for placeship function e.g. if (carrier === true) {length = 5} & if (carrier === true) {placeShip(carrier....) then carrier = false}
  //effectively just using a boolean to determine the next in the chain

  //need to implement the direction of ships

  let carrier = false;
  let battleship = false;
  let destroyer = false;
  let submarine = false;
  let patrolBoat = false;

  const showShipLength = () => {
    if (carrier === false) {
      return 5;
    } else if (battleship === false) {
      return 4;
    } else if (destroyer === false) {
      return 3;
    } else if (submarine === false) {
      return 3;
    } else {
      return 2;
    }
  };

  playerGameBoardCells.addEventListener("mouseover", showShipLength);

  //the placement of ships to be determined by drag and drop in final ver.

  const startGame = () => {
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

    userInterface.updatePlayerGameboard(playerBoard);
    userInterface.updateComputerGameboard(computerBoard);

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
        computer.computerMove(playerBoard);

        userInterface.updatePlayerGameboard(playerBoard);
        userInterface.updateComputerGameboard(computerBoard);
      });
    });
  };

  return { startGame };
})();

module.exports = Gameloop;
