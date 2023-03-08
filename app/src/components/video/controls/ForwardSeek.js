import React from 'react';

const ForwardSeek = (props) => {
  const forwardClickHandler = () => {
		props.videoRef.current.currentTime += 10;
	}

  return (
    <i className="fa-solid fa-arrow-rotate-right controls--icon" onClick={forwardClickHandler}></i>
  )
}

export default ForwardSeek;