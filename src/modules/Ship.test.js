const Ship = require("./Ship");

const smallShip = Ship([1, 2, 3]);

test("get length of ship", () => {
  expect(smallShip.getLength()).toEqual(3);
});

test("get coords", () => {
  expect(smallShip.getCoords()).toStrictEqual([1, 2, 3]);
});

test("check ship health/status", () => {
  expect(smallShip.checkShipHealth()).toStrictEqual([0, 0, 0]);
});

test("check hit functionality", () => {
  expect(smallShip.hit(2)).toStrictEqual([0, 1, 0]);
});

test("check isSunk functionality", () => {
  smallShip.hit(1);
  smallShip.hit(2);
  smallShip.hit(3);
  console.log(smallShip.checkShipHealth());
  expect(smallShip.isSunk()).toBe("She's a goner!");
});
