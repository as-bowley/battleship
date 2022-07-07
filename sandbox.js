Ships: 
length:
health:
isSunk: 

Gameboard: 
placeShip: calls Ship factory
receiveAttack: marks gameboard and, if ship is located, updates Ships health
allShipsSunk: once no ships remain, report so
contains all ships

Player:
takeTurn: 

Gameloop:
gameboards & ships are created
player begins with first move
each move is triggered by clicking on the grid
when it isn't players turn, lock gameboard via the dom and only allow clicks on opposition gameboard
each time an attack misses, mark cell' object as receiving a hit and then, via the dom, all cells that have been prev hit can be styled by a class

