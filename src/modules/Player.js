const Player = (type) => {
  const playerType = type;
  let playerTurn = false;

  const takeTurn = () => {
    if (playerTurn === false) {
      playerTurn = true;
      return playerTurn;
    } else {
      playerTurn = false;
      return playerTurn;
    }
  };

  const computerMove = () => {
    const moves = [];
    let row = randomMove();
    let col = randomMove();

    const randomMove = () => {
      return Math.floor(Math.random() * 11);
    };

    const checkMoves = () => {
      array.forEach((element) => {
        if (JSON.stringify(element) == [row][col]) {
          row = randomMove();
          col = randomMove();
        }
      });
    };

    //after random move has been selected, compare to previous moves and if it matches any of them, pick new move until a unique move has been found
  };

  return { takeTurn };
};

module.exports = Player;
