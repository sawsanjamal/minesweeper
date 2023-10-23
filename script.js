// Display file

import { createBoard } from "./minesweeper.js";
const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 3;
const minesLeftText = document.querySelector("[data-mine-count]");
// 1. Populate the board with tiles and mines
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
console.log(board);

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

//2. Left click and right click on tiles
// 3.Left click will reveal tiles
// 4. Right click will mark tiles
// 5. Check for win/loss
