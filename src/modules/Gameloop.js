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
  const messageDiv = document.getElementById("gameMessages");

  const setGameMessage = () => {
    if (carrier === false) {
      messageDiv.innerText = "Place your carrier";
    } else if (battleship === false) {
      messageDiv.innerText = "Place your battleship";
    } else if (destroyer === false) {
      messageDiv.innerText = "Place your destroyer";
    } else if (submarine === false) {
      messageDiv.innerText = "Place your submarine";
    } else if (patrolBoat === false) {
      messageDiv.innerText = "Place your patrol boat";
    } else {
      messageDiv.innerText = "Press start to begin";
    }
  };

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

  const checkForPlacement = (cell, direction, length) => {
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

    for (let i = -1; i < length; i++) {
      if (direction == "horizontal") {
        const nextCell = document.getElementById(
          `player: [${row}][${limitCellValue(col + i)}]`
        );
        if (nextCell.classList.contains("ship")) {
          return true;
        }
      } else {
        const nextCell = document.getElementById(
          `player: [${limitCellValue(row + i)}][${col}]`
        );
        if (nextCell.classList.contains("ship")) {
          return true;
        }
      }
    }
    return false;
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

    for (let i = 0; i < length + 1; i++) {
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

  const removeEventListeners = () => {
    playerGameBoardCells.forEach(function (e) {
      e.style.pointerEvents = "none";
    });
  };
  playerGameBoardCells.forEach(function (cell) {
    cell.addEventListener("mouseover", function mouseover(e) {
      e.target.classList.add("shipPlacement");
      const cell = e.target.id;

      addExtraCells(cell, direction, showShipLength());
    });
    cell.addEventListener("mouseleave", function mouseleave(e) {
      e.target.classList.remove("shipPlacement");
      const cell = e.target.id;

      removeExtraCells(cell, direction, showShipLength());
    });
    cell.addEventListener("click", function click(e) {
      const cell = e.target.id;

      const checkClear = checkForPlacement(cell, direction, showShipLength());

      if (checkClear === false) {
        const location = cell.split(/\[(-?\d+)\]/);
        const row = location.splice(1, 2).join("");
        const col = location.splice(1, 2).join("");
        if (carrier === false) {
          playerBoard.placeShip("carrier", direction, Number(row), Number(col));
          userInterface.updatePlayerGameboard(playerBoard);
          carrier = true;
          setGameMessage();
        } else if (battleship === false) {
          playerBoard.placeShip(
            "battleship",
            direction,
            Number(row),
            Number(col)
          );
          userInterface.updatePlayerGameboard(playerBoard);
          battleship = true;
          setGameMessage();
        } else if (destroyer === false) {
          playerBoard.placeShip(
            "destroyer",
            direction,
            Number(row),
            Number(col)
          );
          userInterface.updatePlayerGameboard(playerBoard);
          destroyer = true;
          setGameMessage();
        } else if (submarine === false) {
          playerBoard.placeShip(
            "submarine",
            direction,
            Number(row),
            Number(col)
          );
          userInterface.updatePlayerGameboard(playerBoard);
          submarine = true;
          setGameMessage();
        } else {
          playerBoard.placeShip(
            "patrol boat",
            direction,
            Number(row),
            Number(col)
          );
          userInterface.updatePlayerGameboard(playerBoard);
          patrolBoat = true;
          setGameMessage();
          removeEventListeners();
        }
      } else {
        messageDiv.innerText = "Not a valid placement!";
      }
    });
  });

  //the placement of ships to be determined by drag and drop in final ver.

  const startGame = () => {
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
    messageDiv.innerText = "Attack the computers board!";
  };

  return { startGame, setGameMessage };
})();

module.exports = Gameloop;
