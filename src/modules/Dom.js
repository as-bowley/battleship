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
        if (playerBoard[i][j].ship) {
          cell.classList.add("ship");
        }
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
        if (computerBoard[i][j].ship) {
          cell.classList.add("ship");
        }
        computerBoardContainer.appendChild(cell);
      }
    }
  };

  const updatePlayerGameboard = (player) => {
    const playerBoard = player.getBoard();

    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        const button = document.getElementById(`player: [${i}][${j}]`);

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

        if (computerBoard[i][j].isHit === true && computerBoard[i][j].ship) {
          button.classList.add("shipHit");
        } else if (computerBoard[i][j].isHit === true) {
          button.classList.add("hit");
        }
      }
    }
  };

  return {
    renderPlayerGameboard,
    renderComputerGameBoard,
    updatePlayerGameboard,
    updateComputerGameboard,
  };
};

module.exports = Dom;
