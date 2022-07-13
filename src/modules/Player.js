const Player = (type) => {
  const takeTurn = () => {
    if (playerTurn === false) {
      playerTurn = true;
    } else {
      playerTurn = false;
    }
  };

  // computer moves

  const possibleMoves = [];

  const fillPossibleMoves = (() => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        possibleMoves.push([i, j]);
      }
    }
  })();

  const randomMove = () => {
    const index = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves.splice(index, 1);
    return move;
  };

  const computerMove = (playerBoard) => {
    const moves = randomMove();
    const row = moves[0][0];
    const col = moves[0][1];
    playerBoard.receiveAttack(row, col);
  };

  const placeComputerShipRandomly = (ship, board, gameboardObject, length) => {
    const directionArray = ["vertical", "horizontal"];
    const direction =
      directionArray[Math.floor(Math.random() * directionArray.length)];
    let row = getRandomRow(direction, length);
    let col = getRandomCol(direction, length);

    if (boardChecker(board, direction, length, row, col) === false) {
      gameboardObject.placeShip(ship, direction, row, col);
    } else {
      placeComputerShipRandomly(ship, board, gameboardObject, length);
    }
  };

  const boardChecker = (board, direction, length, row, col) => {
    for (let i = 0; i < length + 1; i++) {
      if (direction == "vertical") {
        if (board[row][col + i].hasOwnProperty("ship")) {
          return true;
        }
      } else {
        if (board[row + i][col].hasOwnProperty("ship")) {
          return true;
        }
      }
    }
    return false;
  };

  const getRandomRow = (direction, length) => {
    if (direction == "vertical") {
      return Math.floor(Math.random() * 10);
    } else {
      return Math.floor(Math.random() * (10 - length));
    }
  };

  const getRandomCol = (direction, length) => {
    if (direction == "vertical") {
      return Math.floor(Math.random() * (10 - length));
    } else {
      return Math.floor(Math.random() * 10);
    }
  };

  return {
    takeTurn,
    computerMove,
    placeComputerShipRandomly,
  };
};

module.exports = Player;
