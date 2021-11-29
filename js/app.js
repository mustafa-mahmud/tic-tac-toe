'use strict';

const allBoxes = document.querySelectorAll('ul li span');
const xEl = document.getElementById('x');
const oEl = document.getElementById('o');
const leftEl = document.getElementById('left');
const endEl = document.getElementById('end');
const overlyaEl = document.querySelector('.overlay');
const reStartEl = document.querySelector('.re-start');
const resultEl = document.querySelector('.result');
const activePlayerX = document.querySelector('.name .x');
const activePlayerO = document.querySelector('.name .o');

let player = 'X';
let xScores = 0;
let oScores = 0;
let leftGame = 0;
let endGame = 5;
let playerChoosen = [
  {
    id: 1,
    player: null,
  },
  {
    id: 2,
    player: null,
  },
  {
    id: 3,
    player: null,
  },
  {
    id: 4,
    player: null,
  },
  {
    id: 5,
    player: null,
  },
  {
    id: 6,
    player: null,
  },
  {
    id: 7,
    player: null,
  },
  {
    id: 8,
    player: null,
  },
  {
    id: 9,
    player: null,
  },
];
let winNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let winnerArr = [];

const audio = new Audio('./wrong.mp3');

const showUserClick = (e) => {
  const target = e.target;
  const dataId = +target.getAttribute('data-id');

  if (!isClicked(dataId)) return;

  if (player === 'X') {
    target.textContent = 'X';
    activePlayerX.classList.remove('active');
    activePlayerO.classList.add('active');
    player = 'O';
  } else {
    target.textContent = '0';
    activePlayerX.classList.add('active');
    activePlayerO.classList.remove('active');
    player = 'X';
  }

  ckIsWin();
};

const isClicked = (id) => {
  let res;

  playerChoosen.forEach((allinfo) => {
    if (allinfo.id === id) {
      if (!allinfo.player) {
        allinfo.player = player;
        res = true;
      } else {
        audio.play();
        res = false;
      }
    }
  });

  return res;
};

const ckIsWin = () => {
  const playerX = getClickedId('X');
  const playerO = getClickedId('O');

  const winnerX = getWinner(playerX, 'X');
  const winnerO = getWinner(playerO, 'O');

  if (winnerX && ckDraw() === false) {
    leftGame++;
    xScores++;
    resetGame();
  } else if (winnerO && ckDraw() === false) {
    leftGame++;
    oScores++;
    resetGame();
  }

  //ck is draw
  if (ckDraw()) {
    //it is draw
    setTimeout(() => initGame(), 1000);
  }
};

const getClickedId = (player) => {
  let playerClicked = [];

  for (let i = 0; i < playerChoosen.length; i++) {
    if (playerChoosen[i].player === player) {
      playerClicked.push(playerChoosen[i].id);
    }
  }

  return playerClicked;
};

const getWinner = (playerArr, player) => {
  let counts = 0;

  for (let i = 0; i < winNumbers.length; i++) {
    counts = 0;
    for (let j = 0; j < winNumbers[i].length; j++) {
      if (playerArr.includes(winNumbers[i][j])) {
        counts++;
        if (counts > 2) {
          break;
        }
      }
    }

    if (counts === 3) {
      winnerArr = winNumbers[i];
      break;
    }
  }

  if (counts === 3) return player;
  else return false;
};

const resetGame = () => {
  xEl.textContent = xScores;
  oEl.textContent = oScores;
  leftEl.textContent = leftGame;
  endEl.textContent = endGame;

  //color change win boxes
  resetColor();

  if (leftGame === endGame) {
    setTimeout(() => {
      overlayShow();
    }, 2000);
  }
};

const resetColor = () => {
  allBoxes[winnerArr[0] - 1].style.color = 'red';
  allBoxes[winnerArr[1] - 1].style.color = 'red';
  allBoxes[winnerArr[2] - 1].style.color = 'red';

  allBoxes.forEach((box) => (box.style.pointerEvents = 'none'));

  setTimeout(() => {
    initGame();
  }, 1000);
};

const initGame = () => {
  activePlayerX.classList.add('active');
  activePlayerO.classList.remove('active');

  allBoxes.forEach((box) => {
    box.style.pointerEvents = 'auto';
    box.style.color = 'white';
    box.textContent = '';
  });

  player = 'X';
  playerChoosen = [
    {
      id: 1,
      player: null,
    },
    {
      id: 2,
      player: null,
    },
    {
      id: 3,
      player: null,
    },
    {
      id: 4,
      player: null,
    },
    {
      id: 5,
      player: null,
    },
    {
      id: 6,
      player: null,
    },
    {
      id: 7,
      player: null,
    },
    {
      id: 8,
      player: null,
    },
    {
      id: 9,
      player: null,
    },
  ];
};

const overlayShow = () => {
  xScores > oScores
    ? (resultEl.textContent = 'X')
    : (resultEl.textContent = 'O');
  overlyaEl.classList.add('show');
};

const overlayHide = (e) => {
  const target = e.target;
  if (target.classList.contains('overlay')) {
    overlyaEl.classList.remove('show');
  }
};

const reStartGame = () => {
  window.location.reload();
};

const ckDraw = () => {
  const allPlayersClicks = playerChoosen.map((click) => click.player);

  return allPlayersClicks.every((ckClick) => ckClick);
};

////////////////////
allBoxes.forEach((span) => span.addEventListener('click', showUserClick));
overlyaEl.addEventListener('click', overlayHide);
reStartEl.addEventListener('click', reStartGame);
