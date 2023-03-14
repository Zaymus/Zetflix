import React, { useState } from 'react';

const FullScreen = (props) => {
  const {fullscreen, setFullScreen} = props.fullscreenControls;
  const [fullScreenIcon, setFullScreenIcon] = useState("fa-expand");

  const changeIcon = (fullScreen) => {
    if (fullScreen) {
      setFullScreenIcon("fa-compress");
    } else {
      setFullScreenIcon("fa-expand");
    }
  }

  const fullscreenClickHandler = () => {
    var video = props.videoRef.current.parentNode;

    if (fullscreen) {
      setFullScreen(false);
      changeIcon(false);
      if (video.requestFullscreen) {
        document.exitFullscreen();
      } else if (video.msRequestFullscreen) {
        document.msExitFullscreen();
      } else if (video.mozRequestFullScreen) {
        document.mozExitFullScreen();
      } else if (video.webkitRequestFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      setFullScreen(true);
      changeIcon(true);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    }
  }

  return (
    <i className={`fa-solid controls--icon ${fullScreenIcon}`} onClick={fullscreenClickHandler}></i>
  )
}

export default FullScreen;