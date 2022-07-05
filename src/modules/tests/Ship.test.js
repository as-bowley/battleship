const Ship = require("../Ship");

const smallShip = Ship(3);

test("check ship health/status", () => {
  expect(smallShip.checkShipHealth()).toStrictEqual([0, 0, 0]);
});

test("check hit functionality", () => {
  expect(smallShip.hit(0)).toStrictEqual([1, 0, 0]);
});

test("check isSunk functionality", () => {
  smallShip.hit(0);
  smallShip.hit(1);
  smallShip.hit(2);
  expect(smallShip.isSunk()).toBe(true);
});
