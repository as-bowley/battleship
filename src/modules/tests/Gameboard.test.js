const Gameboard = require("../Gameboard");

test("test attack", () => {
  const playerBoard = Gameboard();
  expect(playerBoard.receiveAttack(1, 2)).toBe(true);
});

test("place ship", () => {
  const playerBoard = Gameboard();
  expect(playerBoard.placeShip("battleship", "vertical", 2, 3)).toStrictEqual({
    isHit: false,
    ship: "battleship",
    index: 0,
  });
});
