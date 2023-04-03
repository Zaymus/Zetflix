import React from 'react';
import './VolumeSlider.css';

const VolumeSlider = (props) => {

  const sliderClickHandler = (event) => {
    var slider = document.querySelector('.slider--container').getBoundingClientRect();
    var indicator = document.querySelector('.slider-value');

    var offset = slider.left;
    var left = event.pageX - offset;
    var width = slider.width;
    var percentage = left / width;
    indicator.style.width = slider.width * percentage + "px";

    if(props.videoRef.current.muted) {
      props.videoRef.current.muted = false;
    }
    
    percentage = percentage < 0 ? 0 : percentage > 100 ? 100 : percentage;

    props.setVolume(percentage);
    props.videoRef.current.volume = percentage;
    
    props.changeIcon(percentage);
  }

  return (
    <div className="slider--container" onClick={sliderClickHandler}>
      <span className="slider-value" onClick={sliderClickHandler}></span>
    </div>
  )
}

export default VolumeSlider;