const generateBoard = () => {
  var board = [];
  for (var i = 0; i < 3; i++) {
    board.push(Array(3).fill('_'));
  }
  return board;
}
var board = generateBoard();



function checkHorizontal(board) {
  board.forEach(row => {
    var str = row.reduce((accum, item) => accum += item, '');
    if (str !== 'XXX' || str === 'OOO') {
      return 'game over'
    } else {
      return 'continue'
    }
  })
}
function checkVertical(board) {
  for (var i = 0; i < board.length; i++) {
    var str = '';
    for (var j = 0; j < board.length; j++) {
      str += board[j][i];
    }
    if (str === 'XXX' || str === 'OOO') {
      return 'Game Over';
    }
  }
  return 'continue';
}

function checkDiagonal(board) {
  var isLeftDiag = 'XXXOOO'.indexOf(board[0][0] + board[1][1] + board[0][1]) > -1;
  var isRightDiag = 'XXXOOO'.indexOf(board[0][2] + board[1][1] + board[2][1]) > -1;
  return isLeftDiag && isRightDiag ? 'GameOver' : 'Continue';
}

function gameStart(key = null, board) {
  if (key === 0) {
    board[0][0] = 1;
  }
  board.forEach(row => {
    console.log(row);
  })
}


const turn = () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  gameStart(null, board);

  readline.question(`Player 1: Choose Your Position?`, (key) => {
    if (key === 'j') {
    } else if (key <= 8 || key >= 0) {
      readline.close();
      board = gameStart(key, board);
      turn();
    } else {
      turn();
    }

    readline.close()
  })
}

turn();