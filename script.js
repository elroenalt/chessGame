const canvas = document.querySelector('#chessDisp')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'
ctx.font = 80 + 'px Arial';

const whiteSymbols = ['♙', '♖', '♘', '♗', '♕', '♔'];
const blackSymbols = ['♟︎', '♜', '♞', '♝', '♛', '♚']
const blackColor = '#006400'
const whiteColor = 'beige'

class chessBoard {
    constructor(scale) {
        this.board = createChessBoard()
        this.scale = scale
        this.movePiece(0,0,4,4)
        this.focusedPos = {x: 4,y: 4}
        this.moves = this.getMoves(this.focusedPos.x,this.focusedPos.y)
        this.draw()
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
                const dirs = [
                    {dx: 1,dy: 0},
                    {dx: -1,dy: 0},
                    {dx: 0, dy: 1},
                    {dx: 0, dy: -1},
                ]
                return this.checkMovesVerDiag(x,y,side,dirs)
            break;
            case 3: 

            break;
        }
        return moves
    }
    checkMovesVerDiag(x,y,side,dirs) {
        let moves = []
        for(let dir of dirs) {
            for(let i = 1; i < 8; i++) {
                const newX = x + i * dir.dx
                const newY = y + i * dir.dy
                if(newY >= 8 || newY < 0 || newX >= 8 || newX < 0 ) {
                    break;

                }
                const piece = this.board[newY][newX]
                if (!piece) {
                    moves.push({ kill: false, x: newX, y: newY })
                } else if (piece.side !== side) {
                    moves.push({ kill: true, x: newX, y: newY })
                    break;
                } else {
                    break;
                }
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
        if(this.moves) {
            let lastKill = true
            for(let move of this.moves) {
                const xDraw = move.x * this.scale
                const yDraw = move.y * this.scale
                if(move.kill) {
                    ctx.fillStyle = '#5c0d0d79'
                    lastKill = true
                }else if(lastKill){
                    ctx.fillStyle = '#0d5c3179'
                    lastKill = false
                }
                ctx.fillRect(xDraw,yDraw,this.scale,this.scale)
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
const board = new chessBoard(80)