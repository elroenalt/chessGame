const canvas = document.querySelector('#chessDisp')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'
ctx.fillRect(0,0,200,200)
class chessBoard {
    constructor() {
        this.board = createChessBoard()
    }
    movePiece(x1,y1,x2,y2) {

    }
    delPiece(x1,y1,x2,y2) {
        
    }
}
function createChessBoard() {
    let board = []
  
    for(let i = 0; i < 8; i++) {
        let array = [];
    for(let j = 0; j < 8; j++) {
      array.push(0)
    }
        board.push(array)
    }
  
    //Pawn
    for(let j = 0; j < 8; j++) {
        board[1][j] = new Piece(1, false)
        board[6][j] = new Piece(1, true)
    }
  
    //Rock
    board[0][0] = board[0][7] = new Piece(2, false);
    board[7][0] = board[7][7] = new Piece(2, true);

    //Knight
    board[0][1] = board[0][6] = new Piece(6, false);
    board[7][1] = board[7][6] = new Piece(3, true);

    //bishop
    board[0][2] = board[0][5] = new Piece(4, false);
    board[7][2] = board[7][5] = new Piece(4, true);

    //Quen
    board[0][3] = new Piece(5, false);
    board[7][3] = new Piece(5, true);

    //King
    board[0][4] = new Piece(6, false);
    board[7][4] = new Piece(6, true);
  
    return board;
}
class Piece {
    constructor(type,side) {
        this.lastMove
        this.type = type
        this.side = side
    }
}