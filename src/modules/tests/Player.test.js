const Player = require("../Player");

test("test player turn", () => {
  const player = Player("player");
  expect(player.takeTurn()).toBe(true);
});
