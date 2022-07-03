const Gameboard = require("./Gameboard");

test("test attack", () => {
  const newGame = Gameboard();
  expect(newGame.receiveAttack(1, 2)).toBe("X");
});

test("check gameboard", () => {
  const newGame = Gameboard();
  expect(newGame.getBoard()).toBe("");
});
