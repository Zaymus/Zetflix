import React from "react";
import "./SeekBar.css";

const SeekBar = (props) => {
  const seekClickHandler = (event) => {
    var seekbar = document.querySelector('.seekbar--container').getBoundingClientRect();

    var offset = seekbar.left;
    var left = event.pageX - offset;
    var width = seekbar.width;
    var percentage = left / width;
    props.onSeek(percentage);
  }

  const seekHoverHandler = (event) => {
    // var seekbar = document.querySelector('.seekbar--container').getBoundingClientRect();
    // var videoPlayer = document.querySelector('#video-player').getBoundingClientRect();
    // var offset = seekbar.left + videoPlayer.left;
    // var left = event.pageX - offset;
    // var width = seekbar.width;
    // var percentage = left / width;
    // console.log(percentage);
  }

  return (
    <div className="seekbar--container" onClick={seekClickHandler} onMouseMove={seekHoverHandler}>
      <span className="buffered" style={{width: props.timeData.buffered + "%"}}></span>
      <span className="watched" style={{width: props.timeData.watched + "%"}}></span>
    </div>
  )
}

export default SeekBar;