const Player = require("./Player");
const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

const Dom = () => {
  const playerBoardContainer = document.getElementById("playerGameBoard");
  const computerBoardContainer = document.getElementById("computerGameBoard");

  const renderPlayerGameboard = (player) => {
    const playerBoard = player.getBoard();

    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        const cell = document.createElement("button");
        cell.setAttribute("id", `player: [${i}][${j}]`);
        cell.classList.add("playerBoardCell");

        playerBoardContainer.appendChild(cell);
      }
    }
  };

  const renderComputerGameBoard = (computer) => {
    const computerBoard = computer.getBoard();

    for (let i = 0; i < computerBoard.length; i++) {
      for (let j = 0; j < computerBoard[i].length; j++) {
        const cell = document.createElement("button");
        cell.setAttribute("id", `computer: [${i}][${j}]`);
        cell.classList.add("computerBoardCell");

        computerBoardContainer.appendChild(cell);
      }
    }
  };

  const updatePlayerGameboard = (player) => {
    const playerBoard = player.getBoard();

    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        const button = document.getElementById(`player: [${i}][${j}]`);
        if (playerBoard[i][j].ship) {
          button.classList.add("ship");
        }
        if (playerBoard[i][j].isHit === true && playerBoard[i][j].ship) {
          button.classList.add("shipHit");
        } else if (playerBoard[i][j].isHit === true) {
          button.classList.add("hit");
        }
      }
    }
  };

  const updateComputerGameboard = (computer) => {
    const computerBoard = computer.getBoard();
    for (let i = 0; i < computerBoard.length; i++) {
      for (let j = 0; j < computerBoard[i].length; j++) {
        const button = document.getElementById(`computer: [${i}][${j}]`);
        // if (computerBoard[i][j].ship) {
        //   button.classList.add("ship");
        // }
        if (
          computerBoard[i][j].isHit === true &&
          computerBoard[i][j].ship &&
          computerBoard[i][j].sunk === true
        ) {
          button.classList.add("sunk");
        } else if (
          computerBoard[i][j].isHit === true &&
          computerBoard[i][j].ship
        ) {
          button.classList.add("shipHit");
        } else if (computerBoard[i][j].isHit === true) {
          button.classList.add("hit");
        }
      }
    }
  };

  const playerGameBoardCells = document.querySelectorAll(".playerBoardCell");
  const rotateButton = document.getElementById("rotateButton");
  const messageDiv = document.getElementById("gameMessages");
  const startButton = document.getElementById("startButton");

  let carrier = false;
  let battleship = false;
  let destroyer = false;
  let submarine = false;
  let patrolBoat = false;

  let direction = "vertical";

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
      startButton.classList.remove("disabled");
      messageDiv.innerText = "Press start to begin";
    }
  };

  const rotateButtonListener = () => {
    rotateButton.addEventListener("click", function () {
      if (direction == "vertical") {
        direction = "horizontal";
      } else {
        direction = "vertical";
      }
    });
  };

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

    if (direction == "vertical") {
      row = location.splice(1, 2).join("");
      col = Number(location.splice(1, 2).join("")) + 1;
    } else {
      row = Number(location.splice(1, 2).join("")) + 1;
      col = location.splice(1, 2).join("");
    }

    for (let i = 0; i < length; i++) {
      if (direction == "horizontal") {
        const nextCell = document.getElementById(
          `player: [${limitCellValue(row + i)}][${col}]`
        );
        nextCell.classList.add("shipPlacement");
      } else {
        const nextCell = document.getElementById(
          `player: [${row}][${limitCellValue(col + i)}]`
        );
        nextCell.classList.add("shipPlacement");
      }
    }
  };

  const removeExtraCells = (cell, direction, length) => {
    let location = cell.split(/\[(-?\d+)\]/);
    let row;
    let col;

    if (direction == "vertical") {
      row = location.splice(1, 2).join("");
      col = Number(location.splice(1, 2).join("")) + 1;
    } else {
      row = Number(location.splice(1, 2).join("")) + 1;
      col = location.splice(1, 2).join("");
    }

    for (let i = 0; i < length + 1; i++) {
      if (direction == "horizontal") {
        const nextCell = document.getElementById(
          `player: [${limitCellValue(row + i)}][${col}]`
        );
        nextCell.classList.remove("shipPlacement");
      } else {
        const nextCell = document.getElementById(
          `player: [${row}][${limitCellValue(col + i)}]`
        );
        nextCell.classList.remove("shipPlacement");
      }
    }
  };

  const removeEventListeners = (playerBoardCells) => {
    playerBoardCells.forEach(function (e) {
      e.style.pointerEvents = "none";
    });
  };

  const playerListeners = (playerBoardCells, playerBoard, userInterface) => {
    playerBoardCells.forEach(function (cell) {
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
            playerBoard.placeShip(
              "carrier",
              direction,
              Number(row),
              Number(col)
            );
            userInterface.updatePlayerGameboard(playerBoard);
            carrier = true;
            userInterface.setGameMessage();
          } else if (battleship === false) {
            playerBoard.placeShip(
              "battleship",
              direction,
              Number(row),
              Number(col)
            );
            userInterface.updatePlayerGameboard(playerBoard);
            battleship = true;
            userInterface.setGameMessage();
          } else if (destroyer === false) {
            playerBoard.placeShip(
              "destroyer",
              direction,
              Number(row),
              Number(col)
            );
            userInterface.updatePlayerGameboard(playerBoard);
            destroyer = true;
            userInterface.setGameMessage();
          } else if (submarine === false) {
            playerBoard.placeShip(
              "submarine",
              direction,
              Number(row),
              Number(col)
            );
            userInterface.updatePlayerGameboard(playerBoard);
            submarine = true;
            userInterface.setGameMessage();
          } else {
            playerBoard.placeShip(
              "patrol boat",
              direction,
              Number(row),
              Number(col)
            );
            userInterface.updatePlayerGameboard(playerBoard);
            patrolBoat = true;
            userInterface.setGameMessage();
            removeEventListeners(playerBoardCells);
          }
        } else {
          messageDiv.innerText = "Not a valid placement!";
        }
      });
    });
  };

  return {
    renderPlayerGameboard,
    renderComputerGameBoard,
    updatePlayerGameboard,
    updateComputerGameboard,
    setGameMessage,
    rotateButtonListener,
    showShipLength,
    messageDiv,
    playerListeners,
  };
};

module.exports = Dom;
