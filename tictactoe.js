const generateBoard = () => {
  let board = [];
  for (var i = 0; i < 3; i++) {
    board.push(Array(3).fill('_'));
  }
  return board;
}

let board = generateBoard();

function checkHorizontal(board) {
  var flag = false;
  board.forEach(row => {
    var str = row.reduce((accum, item) => accum += item, '');
    if (['XXX', 'OOO'].includes(str)) {
      flag = true;
    }
  })
  return flag;
}

function checkVertical(board) {
  for (var i = 0; i < board.length; i++) {
    var str = '';
    for (var j = 0; j < board.length; j++) {
      str += board[j][i];
    }
    if (['XXX', 'OOO'].includes(str)) {
      return true;
    }
  }
  return false;
}

function checkDiagonal(board) {
  var rightDiag = '' + board[2][0] + board[1][1] + board[0][2];
  var leftDiag = '' + board[0][0] + board[1][1] + board[2][2];

  var isLeftDiag = ['XXX', 'OOO'].includes(leftDiag);
  var isRightDiag = ['XXX', 'OOO'].includes(rightDiag);


  return (isLeftDiag || isRightDiag)
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

function showBoard(board) {
  board.forEach((row) => {
    console.log(row);
  })
}

gameStart(null, piece = 'X', board);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const turn = (whoseTurn, prevKeys) => {
  whoseTurn = !whoseTurn;

  var piece = '';
  if (whoseTurn) {
    piece = 'X';
  } else {
    piece = 'O'
  }

  if (!checkHorizontal(board) && !checkVertical(board) && !checkDiagonal(board)) {
    readline.question(`Player: Choose Your Position?`, (key) => {
      if (key === 'j') {
        readline.close();
      } else if ((key <= 9 || key >= 1) && !(prevKeys.includes(key))) {
        board = gameStart(key, piece, board);
        prevKeys.push(key);
        turn(whoseTurn, prevKeys);
      } else {
        showBoard(board);
        console.log(`You have placed ${piece === 'O' ? 'X' : 'O'} in an occupied location`)
        turn(!whoseTurn, prevKeys)
      }
    })
  } else {
    if (piece === 'O') {
      console.log('Player X has won');
    } else {
      console.log('Player O has won.');
    }
    readline.close()
  }
}

turn(true, []);