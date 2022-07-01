const { values } = require("lodash");

const Ship = (location) => {
  const coordinates = location;
  const shipsHealth = Array(coordinates.length).fill(0);
  const getLength = () => {
    return coordinates.length;
  };
  const getCoords = () => {
    return coordinates;
  };
  const checkShipHealth = () => {
    return shipsHealth;
  };
  const hit = (coordinate) => {
    shipsHealth[coordinates.indexOf(coordinate)] = 1;
    return shipsHealth;
  };
  const isSunk = () => {
    if (shipsHealth.reduce((acc, curVal) => acc + curVal) === 3) {
      return "She's a goner!";
    }
  };
  return { getLength, getCoords, checkShipHealth, hit, isSunk };
};

module.exports = Ship;
