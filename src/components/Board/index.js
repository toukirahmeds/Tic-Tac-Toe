import React from 'react';
import './index.css';
import { Square } from '../Square';

const winningLines = [
    [0,1,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [null, null, null, null, null, null, null, null, null],
            history: [[null, null, null, null, null, null, null, null, null]],
            currentHistoryCount: 0,
            countMoves: 0,
            nextItem: "X",
            winner: null,
        };
    }

    onSquareClick(id) {
        const squares = this.state.squares.slice();
        const history = this.state.history.slice();
        let countMoves = this.state.countMoves;
        let currentHistoryCount = this.state.currentHistoryCount;
        if(!squares[id]) {
            squares[id] = this.state.nextItem;
            const winnerFound = winningLines.some(line => {
                return line.every(item => squares[item] === this.state.nextItem);
            });
            const currentItem = this.state.nextItem;
            history.push(squares);
            countMoves++;
            currentHistoryCount++;
            this.setState({
                squares,
                history,
                currentHistoryCount,
                countMoves,
                nextItem: currentItem === "X" ? "O" : "X",
                winner: winnerFound? currentItem: null,
            });
        }
    };

    gotoPrevious() {
        const { history } = this.state;
        let currentHistoryCount = this.state.currentHistoryCount;
        currentHistoryCount--;
        const squares = history[currentHistoryCount].slice();
        this.setState({
            squares,
            currentHistoryCount
        });
    }

    getSquare(id) {
        return <Square id={this.state.squares[id]} onClick={() => {
            if(!this.state.winner) {
                this.onSquareClick(id);
            }
        }} />;
    }

    render() {
        const status = `${this.state.winner? "Winner" : "Next player"}: ${this.state.winner || this.state.nextItem}`;
        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    <div className='board-row'>
                        {this.getSquare(0)}
                        {this.getSquare(1)}
                        {this.getSquare(2)}
                    </div>
                    <div className='board-row'>
                        {this.getSquare(3)}
                        {this.getSquare(4)}
                        {this.getSquare(5)}
                    </div>
                    <div className='board-row'>
                        {this.getSquare(6)}
                        {this.getSquare(7)}
                        {this.getSquare(8)}
                    </div>
                </div>
                {this.state.currentHistoryCount > 0 && <div>
                    <button onClick={() => {
                        this.gotoPrevious();
                    }}>Go to Previous Move</button>
                </div>}
            </div>
        );
    }
}
