const Ship = (length) => {
  const shipsHealth = Array(length).fill(0);

  const checkShipHealth = () => {
    return shipsHealth;
  };

  const hit = (index) => {
    shipsHealth[index] = 1;
    isSunk();
    return shipsHealth;
  };

  const isSunk = () => {
    if (shipsHealth.reduce((acc, curVal) => acc + curVal) === length) {
      return true;
    } else {
      return false;
    }
  };
  return { checkShipHealth, hit, isSunk };
};

module.exports = Ship;
