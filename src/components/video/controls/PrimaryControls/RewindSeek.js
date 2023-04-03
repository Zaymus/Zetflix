import React from 'react';

const RewindSeek = (props) => {
  const rewindClickHandler = () => {
		props.videoRef.current.currentTime -= 10;
    props.socket?.emit("room.seek", {
      time: props.videoRef.current.currentTime,
      roomId: props.room
    });
	}

  return (
    <i className="fa-solid fa-arrow-rotate-left controls--icon" onClick={rewindClickHandler}></i>
  )
}

export default RewindSeek;