const Ship = require("./Ship");
const Dom = require("./Dom");
const { indexOf } = require("lodash");

const Gameboard = () => {
  const gameBoard = [...Array(10)].map((e) => Array(10).fill({ isHit: false }));

  let carrier;
  let battleship;
  let destroyer;
  let submarine;
  let patrolBoat;

  const getBoard = () => [...gameBoard];

  const receiveAttack = (row, col) => {
    if (gameBoard[row][col].isHit == false && gameBoard[row][col].ship) {
      const hitShip = determineShipHit(gameBoard[row][col].ship);
      gameBoard[row][col].isHit = true;
      hitShip.hit(gameBoard[row][col].index);
    } else {
      gameBoard[row][col] = { isHit: true };
      console.log(gameBoard[row][col]);
    }
    // if (shipsLeft() === false) {
    //   //update dom to say win
    // }
  };

  const determineShipHit = (ship) => {
    switch (ship) {
      case "carrier":
        return carrier;
        break;
      case "battleship":
        return battleship;
        break;
      case "destroyer":
        return destroyer;
        break;
      case "submarine":
        return submarine;
        break;
      case "patrol boat":
        return patrolBoat;
        break;
      default:
        break;
    }
  };

  const setShipLocation = (name, length, orientation, startRow, startCol) => {
    if (orientation == "vertical") {
      for (let i = 0; i < length; i++) {
        gameBoard[startRow + i][startCol] = {
          isHit: false,
          ship: name,
          index: 0 + i,
        };
      }
    } else {
      for (let i = 0; i < length; i++) {
        gameBoard[startRow][startCol + i] = {
          isHit: false,
          ship: name,
          index: 0 + i,
        };
      }
    }
  };

  const placeShip = (ship, orientation, row, col) => {
    switch (ship) {
      case "carrier":
        carrier = Ship(5);
        setShipLocation("carrier", 5, orientation, row, col);
        break;
      case "battleship":
        battleship = Ship(4);
        setShipLocation("battleship", 4, orientation, row, col);
        break;
      case "destroyer":
        destroyer = Ship(3);
        setShipLocation("destroyer", 3, orientation, row, col);
        break;
      case "submarine":
        submarine = Ship(3);
        setShipLocation("submarine", 3, orientation, row, col);
        break;
      case "patrol boat":
        patrolBoat = Ship(2);
        setShipLocation("patrol boat", 2, orientation, row, col);
        break;
      default:
        break;
    }
    return gameBoard[row][col];
  };

  const shipsLeft = () => {
    if (
      carrier.isSunk() === true &&
      battleship.isSunk() === true &&
      destroyer.isSunk() === true &&
      submarine.isSunk() === true &&
      patrolBoat.isSunk() === true
    ) {
      return false;
    } else {
      return true;
    }
  };

  return {
    receiveAttack,
    getBoard,
    placeShip,
  };
};

module.exports = Gameboard;
