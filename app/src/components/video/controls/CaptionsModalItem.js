import React from 'react';
import "./CaptionsModalItem.css";

const CaptionsModalItem = (props) => {
  return (
    <div data-key={props["data-key"]} data-language={props.language} className={props.selected ? 'selected' : ''} onClick={props.onClick}>
        <svg viewBox='0 0 16 16'>
          <circle 
            cx="8"
            cy="8"
            r="7"
            stroke="gray"
            strokeWidth="2"
            fill={props.selected ? 'white' : 'Gray'} />
        </svg>
        <span>{props.language}</span>
      </div>
  );
}

export default CaptionsModalItem