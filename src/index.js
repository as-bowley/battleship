import _ from "lodash";
import "./style.scss";
const Player = require("./modules/Player");
const Gameboard = require("./modules/Gameboard");
const Ship = require("./modules/Ship");
const Dom = require("./modules/Dom");
const Gameloop = require("./modules/Gameloop");

const start = document.getElementById("startButton");
start.addEventListener("click", Gameloop.startGame);
const resetGame = document.getElementById("resetButton");
resetGame.addEventListener("click", Gameloop);
