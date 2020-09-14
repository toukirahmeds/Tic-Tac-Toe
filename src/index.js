import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

import {Board} from './components/Board';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div>
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDom.render(<Game />, document.getElementById('root'));
