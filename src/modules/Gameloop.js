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

  const playerGameBoardCells = document.querySelectorAll(".playerBoardCell");
  const rotateButton = document.getElementById("rotateButton");

  //declare all ships with boolean
  //go through each ship with if statement when using mouseover function or onclick for placeship function e.g. if (carrier === true) {length = 5} & if (carrier === true) {placeShip(carrier....) then carrier = false}
  //effectively just using a boolean to determine the next in the chain

  //need to implement the direction of ships

  let carrier = false;
  let battleship = false;
  let destroyer = false;
  let submarine = false;
  let patrolBoat = false;

  let direction = "vertical";
  rotateButton.addEventListener("click", function () {
    if (direction == "vertical") {
      direction = "horizontal";
    } else {
      direction = "vertical";
    }
  });

  const showShipLength = () => {
    if (carrier === false) {
      return 4;
    } else if (battleship === false) {
      return 3;
    } else if (destroyer === false) {
      return 2;
    } else if (submarine === false) {
      return 2;
    } else {
      return 1;
    }
  };

  const limitCellValue = (num, min = 0, max = 9) => {
    const parsed = parseInt(num);
    return Math.min(Math.max(parsed, min), max);
  };

  const addExtraCells = (cell, direction, length) => {
    let location = cell.split(/\[(-?\d+)\]/);
    let row;
    let col;

    if (direction == "horizontal") {
      row = location.splice(1, 2).join("");
      col = Number(location.splice(1, 2).join("")) + 1;
    } else {
      row = Number(location.splice(1, 2).join("")) + 1;
      col = location.splice(1, 2).join("");
    }

    for (let i = 0; i < length; i++) {
      if (direction == "horizontal") {
        const nextCell = document.getElementById(
          `player: [${row}][${limitCellValue(col + i)}]`
        );
        nextCell.classList.add("shipPlacement");
      } else {
        const nextCell = document.getElementById(
          `player: [${limitCellValue(row + i)}][${col}]`
        );
        nextCell.classList.add("shipPlacement");
      }
    }
  };

  const removeExtraCells = (cell, direction, length) => {
    let location = cell.split(/\[(-?\d+)\]/);
    let row;
    let col;

    if (direction == "horizontal") {
      row = location.splice(1, 2).join("");
      col = Number(location.splice(1, 2).join("")) + 1;
    } else {
      row = Number(location.splice(1, 2).join("")) + 1;
      col = location.splice(1, 2).join("");
    }

    for (let i = 0; i < length; i++) {
      if (direction == "horizontal") {
        const nextCell = document.getElementById(
          `player: [${row}][${limitCellValue(col + i)}]`
        );
        nextCell.classList.remove("shipPlacement");
      } else {
        const nextCell = document.getElementById(
          `player: [${limitCellValue(row + i)}][${col}]`
        );
        nextCell.classList.remove("shipPlacement");
      }
    }
  };

  playerGameBoardCells.forEach(function (cell) {
    cell.addEventListener("mouseover", function (e) {
      e.target.classList.add("shipPlacement");
      const cell = e.target.id;

      addExtraCells(cell, direction, showShipLength());
    });
    cell.addEventListener("mouseleave", function (e) {
      e.target.classList.remove("shipPlacement");
      const cell = e.target.id;

      removeExtraCells(cell, direction, showShipLength());
    });
    cell.addEventListener("click", function (e) {
      const cell = e.target.id;
      const location = cell.split(/\[(-?\d+)\]/);
      const row = location.splice(1, 2).join("");
      const col = location.splice(1, 2).join("");
      if (carrier === false) {
        playerBoard.placeShip("carrier", direction, Number(row), Number(col));
        userInterface.updatePlayerGameboard(playerBoard);
        carrier = true;
      } else if (battleship === false) {
        playerBoard.placeShip(
          "battleship",
          direction,
          Number(row),
          Number(col)
        );
        userInterface.updatePlayerGameboard(playerBoard);
        battleship = true;
      } else if (destroyer === false) {
        playerBoard.placeShip("destroyer", direction, Number(row), Number(col));
        userInterface.updatePlayerGameboard(playerBoard);
        destroyer = true;
      } else if (submarine === false) {
        playerBoard.placeShip("submarine", direction, Number(row), Number(col));
        userInterface.updatePlayerGameboard(playerBoard);
        submarine = true;
      } else {
        playerBoard.placeShip(
          "patrol boat",
          direction,
          Number(row),
          Number(col)
        );
        userInterface.updatePlayerGameboard(playerBoard);
        patrolBoat = true;
      }
    });
  });

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
