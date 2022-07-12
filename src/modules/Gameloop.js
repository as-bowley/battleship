const Player = require("./Player");
const Gameboard = require("./Gameboard");
const Ship = require("./Ship");
const Dom = require("./Dom");

const Gameloop = (() => {
  let player = Player("human");
  let computer = Player("computer");

  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const userInterface = Dom();

  const setMessageDisplay = userInterface.setGameMessage();
  const setRotateButton = userInterface.rotateButtonListener();

  userInterface.renderPlayerGameboard(playerBoard);
  userInterface.renderComputerGameBoard(computerBoard);

  const playerGameBoardCells = document.querySelectorAll(".playerBoardCell");
  const playerBoardContainer = document.getElementById("playerGameBoard");
  const computerBoardContainer = document.getElementById("computerGameBoard");

  userInterface.playerListeners(
    playerGameBoardCells,
    playerBoard,
    userInterface
  );

  const startGame = () => {
    computer.placeComputerShipRandomly(
      "carrier",
      computerBoard.getBoard(),
      computerBoard,
      5
    );
    computer.placeComputerShipRandomly(
      "battleship",
      computerBoard.getBoard(),
      computerBoard,
      4
    );
    computer.placeComputerShipRandomly(
      "destroyer",
      computerBoard.getBoard(),
      computerBoard,
      3
    );
    computer.placeComputerShipRandomly(
      "submarine",
      computerBoard.getBoard(),
      computerBoard,
      3
    );
    computer.placeComputerShipRandomly(
      "patrol boat",
      computerBoard.getBoard(),
      computerBoard,
      2
    );

    userInterface.updatePlayerGameboard(playerBoard);
    userInterface.updateComputerGameboard(computerBoard);

    const computerGameBoardCells =
      document.querySelectorAll(".computerBoardCell");

    computerGameBoardCells.forEach(function (cell) {
      cell.addEventListener("click", function (e) {
        const cell = e.target.id;
        const location = cell.split(/\[(-?\d+)\]/);
        const row = location.splice(1, 2).join("");
        const col = location.splice(1, 2).join("");

        computerBoard.receiveAttack(row, col);
        if (computerBoard.shipsLeft() === false) {
          playerBoardContainer.classList.add("disabled");
          computerBoardContainer.classList.add("disabled");
          userInterface.messageDiv.innerText = "You win!";
        }
        computer.computerMove(playerBoard);
        if (playerBoard.shipsLeft() === false) {
          playerBoardContainer.classList.add("disabled");
          computerBoardContainer.classList.add("disabled");
          userInterface.messageDiv.innerText = "Computer wins!";
        }

        userInterface.updatePlayerGameboard(playerBoard);
        userInterface.updateComputerGameboard(computerBoard);
      });
    });
    userInterface.messageDiv.innerText = "Attack the computers board!";
  };

  return { startGame };
})();

module.exports = Gameloop;
