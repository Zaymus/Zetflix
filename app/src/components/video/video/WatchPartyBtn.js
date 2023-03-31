import React from "react";
import { useNavigate } from 'react-router-dom';
import './WatchPartyBtn.css';

const WatchPartyBtn = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/theatre-room?video=${props.videoId}`);
  }

  return (
    <span className='btn--container'>
      <div className='btn--wrapper' onClick={clickHandler}>
        <i className="fa-solid fa-masks-theater watchparty--btn"></i>
      </div>
    </span>
  );
}

export default WatchPartyBtn;