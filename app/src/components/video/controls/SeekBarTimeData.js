import React from 'react';
import './SeekBarTimeData.css';

const SeekBarTimeData = (props) => {
  const formatTime = (time) => {
    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    const timeString =  (hours > 0 ? hours.toString().padStart(2, '0') + ':' : '') + 
      minutes.toString().padStart(2, '0') + ':' + 
      seconds.toString().padStart(2, '0');
    
    return timeString;
  }
  
  return (
    <div className="timestamp--container">
      <p className="watch">{formatTime(props.timeData.watchTime)}</p>
      <p className="total">{formatTime(props.timeData.totalTime)}</p>
    </div>
  )
}

export default SeekBarTimeData;