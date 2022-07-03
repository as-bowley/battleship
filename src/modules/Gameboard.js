const Gameboard = () => {
  const gameBoard = [...Array(10)].map((e) => Array(10).fill("0"));
  const getBoard = () => [...gameBoard];
  const receiveAttack = (row, col) => {
    if (gameBoard[row][col] != '') {
      
    }
    gameBoard[row][col] = "X";
    return gameBoard[row][col];
  };
  const placeShip = (ship, row, col) => {
    gameBoard[row][col] = 
  }

  return {
    receiveAttack,
    getBoard,
  };
};

module.exports = Gameboard;

/* 
Ships:
Carrier = 5
Battleship = 4
Destroyer = 3
Submarine = 3
Patrol Boat = 2

*/
