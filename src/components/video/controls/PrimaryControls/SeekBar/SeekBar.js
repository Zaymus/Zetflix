import React, { useEffect } from "react";
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

  useEffect(() => {
		props.socket?.on("seekVideo", (time) => {
 			props.videoRef.current.currentTime = parseFloat(time);
       props.videoRef.current.pause();
       props.videoRef.current.play();
		});
	}, [props]);

  return (
    <div className="seekbar--container" onClick={seekClickHandler} >
      <span className="buffered" style={{width: props.timeData.buffered + "%"}}></span>
      <span className="watched" style={{width: props.timeData.watched + "%"}}></span>
    </div>
  )
}

export default SeekBar;