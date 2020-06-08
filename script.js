const cellElements = document.querySelectorAll('[data-cell]');
const winningMsgElement = document.getElementById('winning-msg');
const winningMsgTextElement = document.querySelector('[data-winning-msg-text]');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const restartBtn = document.getElementById('restart-btn');
let circleTurn;

// const game = () => {
//   const playBtn = document.querySelector('.intro button');
//   const introScreen = document.querySelector('.intro');
//   const match = document.querySelector('.match');

//   playBtn.addEventListener('click', () => {
//     introScreen.classList.add('fadeOut');
//     match.classList.add('fadeIn');
//   });
// };

// game();

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgTextElement.innerText = 'Draw';
  } else {
    winningMsgTextElement.innerText = `${circleTurn ? 'Circles' : "X's"} win!`;
  }
  winningMsgElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return winners.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
