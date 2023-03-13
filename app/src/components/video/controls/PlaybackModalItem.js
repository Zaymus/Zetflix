import React from 'react';
import "./PlaybackModalItem.css";

const PlaybackModalItem = (props) => {
  return (
    <div data-value={props.value} className={props.selected ? 'selected' : ''} onClick={props.onClick}>
        <svg>
          <circle 
            cx="8"
            cy="8"
            r="7"
            stroke="gray"
            strokeWidth="2"
            fill={props.selected ? 'white' : 'Gray'} />
        </svg>
        <span>{props.value}x</span>
      </div>
  );
}

export default PlaybackModalItem