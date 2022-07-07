const Player = (type) => {
  const playerType = type;
  let playerTurn = true;

  const takeTurn = () => {
    if (playerTurn === false) {
      playerTurn = true;
    } else {
      playerTurn = false;
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

  return { playerTurn, takeTurn };
};

module.exports = Player;
