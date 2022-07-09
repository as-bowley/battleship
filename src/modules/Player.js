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

  return { takeTurn, computerMove };
};

module.exports = Player;
