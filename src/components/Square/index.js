import React from 'react';
import './index.css';

export class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => {
                this.props.onClick();
            }}>
                {this.props.id}
            </button>);
    }
}
