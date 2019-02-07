const generateBoard = () => {
  let board = [];
  for (var i = 0; i < 3; i++) {
    board.push(Array(3).fill('_'));
  }
  return board;
}

let board = generateBoard();



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

function gameStart(key = null, piece, board) {
  if (key === '1') {
    board[0][0] = piece;
  } else if (key === '2') {
    board[0][1] = piece;
  } else if (key === '3') {
    board[0][2] = piece;
  } else if (key === '4') {
    board[1][0] = piece;
  } else if (key === '5') {
    board[1][1] = piece
  } else if (key === '6') {
    board[1][2] = piece
  } else if (key === '7') {
    board[2][0] = piece
  } else if (key === '8') {
    board[2][1] = piece
  } else if (key === '9') {
    board[2][2] = piece
  }


  board.forEach((row) => {
    console.log(row);
  })
  return board;
}
gameStart(null, piece = 'X', board);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const turn = (whoseTurn) => {
  whoseTurn = !whoseTurn;

  var piece = '';
  if (whoseTurn) {
    piece = 'X';
  } else {
    piece = 'O'
  }
  readline.question(`Player 1: Choose Your Position?`, (key) => {
    if (key === 'j') {
      readline.close();
    } else if (key <= 9 || key >= 1) {
      board = gameStart(key, piece, board);
      turn(whoseTurn);
    }

  })
}

turn(true);