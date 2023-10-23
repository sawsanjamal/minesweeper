// Display file

import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkLose,
  checkWin,
} from "./minesweeper.js";
const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;
const minesLeftText = document.querySelector("[data-mine-count]");
// 1. Populate the board with tiles and mines
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const messageText = document.querySelector(".subtext");

//2. Left click and right click on tiles
// 3.Left click will reveal tiles
// 4. Right click will mark tiles
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}
// 5. Check for win/loss
function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);
  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You win";
  }

  if (lose) {
    messageText.textContent = "You lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}
function stopProp(e) {
  e.stopImmediatePropagation;
}
