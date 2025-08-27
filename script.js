const canvas = document.querySelector('#chessDisp')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'
ctx.font = 100 + 'px Arial';

const whiteSymbols = ['♙', '♖', '♘', '♗', '♕', '♔'];
const blackSymbols = ['♟︎', '♜', '♞', '♝', '♛', '♚']
const blackColor = '#006400'
const whiteColor = 'beige'

class chessBoard {
    constructor(scale) {
        this.board = createChessBoard()
        this.scale = scale
        this.draw()
        this.movePiece(0,0,4,4)
        console.log(this.getMoves(4,4))
    }
    getMoves(x,y) {
        const piece = this.board[y][x]
        if(!piece) {
            return false
        }
        const side = piece.side
        let moves = []
        switch(piece.type) {
            case 1:
                moves.concat(this.checkMovesInRow(x,y,side))
                moves.concat(this.checkMovesInCol(x,y,side))
            break;
        }
        return moves
    }
    checkMovesInRow(x,y,side) {
        let moves = []
        for(let newX = x; newX < 8; newX++) {
            const move = {kill:false,x:newX,y:y}
            const piece = this.board[y][newX]
            if(!piece) {
                moves.push(move)
                console.log(newX,y)
            }else if(piece.side !== side) {
                move.kill = true;
                moves.push(move)
                console.log('kill')
                break;
            }else if(piece.side == side) {
                move.kill = true;
                moves.push(move)
                console.log(piece)
                break;
            }
        }
        for(let newX = x; newX > 0; newX--) {
            const move = {kill:false,x:newX,y:y}
            const piece = this.board[y][newX]
            if(piece.side != side) {
                move.kill = true;
            }else if(!piece) {
                moves.push(move)
            }
        }
        console.log(moves)
        return moves
    }
    checkMovesInCol(x,y,side) {
        let moves = []
        for(let newY = y; newY < 8; newY++) {
            const move = {kill:false,x:x,y:newY}
            const piece = this.board[newY][x]
            if(piece.side != side) {
                move.kill = true;
            }else if(!piece) {
                moves.push(move)
            }
        }
        for(let newY = y; newY > 0; newY--) {
            const move = {kill:false,x:x,y:newY}
            const piece = this.board[newY][x]
            if(piece.side != side) {
                move.kill = true;
            }else if(!piece) {
                moves.push(move)
            }
        }
        return moves
    }
    movePiece(x1,y1,x2,y2) {
        const piece = this.board[y1][x1]
        this.board[y1][x1] = false
        this.board[y2][x2] = piece
        this.draw()
    }
    delPiece(x1,y1) {
        this.board[y1][x1] = false
        this.draw()
    }
    draw() {
        let black = true
        for(let y = 0; y < 8; y++) {
            black = !black
            for(let x = 0; x < 8; x++) {
                let color;
                if(black) {color = blackColor}
                else {color = whiteColor}
                ctx.fillStyle = color
                const xDraw = x * this.scale;
                const yDraw = y * this.scale;
                ctx.fillRect(xDraw,yDraw,this.scale,this.scale)
                black = !black
                const cell = this.board[y][x]
                if(cell) {
                    const symbol = getSymbol(cell.type,cell.side)
                    ctx.fillStyle = 'black'
                    ctx.fillText(symbol, xDraw, yDraw+this.scale);
                }
            }
        }
    }
}
function getSymbol(type,side) {
    const Symbols = side ? whiteSymbols : blackSymbols;
    return Symbols[type]
}
function createChessBoard() {
    let board = []
  
    for(let i = 0; i < 8; i++) {
        let array = [];
    for(let j = 0; j < 8; j++) {
      array.push(false)
    }
        board.push(array)
    }
  
    //Pawn
    for(let j = 0; j < 8; j++) {
        board[1][j] = new Piece(0, false)
        board[6][j] = new Piece(0, true)
    }
  
    //Rock
    board[0][0] = board[0][7] = new Piece(1, false);
    board[7][0] = board[7][7] = new Piece(1, true);

    //Knight
    board[0][1] = board[0][6] = new Piece(2, false);
    board[7][1] = board[7][6] = new Piece(2, true);

    //bishop
    board[0][2] = board[0][5] = new Piece(3, false);
    board[7][2] = board[7][5] = new Piece(3, true);

    //Quen
    board[0][3] = new Piece(4, false);
    board[7][3] = new Piece(4, true);

    //King
    board[0][4] = new Piece(5, false);
    board[7][4] = new Piece(5, true);
  
    return board;
}
class Piece {
    constructor(type,side) {
        this.lastMove
        this.type = type
        this.side = side
    }
}
const board = new chessBoard(100)