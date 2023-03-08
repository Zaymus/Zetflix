import React, { useState } from 'react';
import './Volume.css';

const Volume = (props) => {
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("fa-volume-high");

  const changeIcon = () => {
    if (volume <= 0.05) {
      setVolumeIcon("fa-volume-xmark");
    } else if (volume < 0.4 && volume > 0.05) {
      setVolumeIcon("fa-volume-off");
    } else if (volume < 0.7) {
      setVolumeIcon("fa-volume-low");
    } else if (volume <= 1) {
      setVolumeIcon("fa-volume-high");
    }
  }

  const volumeClickHandler = () => {
    if (props.videoRef.current.muted) {
      props.videoRef.current.muted = false;
      changeIcon();
    } else {
      props.videoRef.current.muted = true;
      setVolumeIcon("fa-volume-xmark");
    }
  }

  const sliderChangeHandler = (event) => {
    if(props.videoRef.current.muted) {
      props.videoRef.current.muted = false;
    }
    setVolume(event.target.value);
    props.videoRef.current.volume = volume;
    
    changeIcon();
  }

  return (
    <div className='volume'>
      <i 
        id="volume"
        className={"fa-solid controls--icon " + volumeIcon}
        onClick={volumeClickHandler}
      ></i>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.05" 
        value={volume} 
        onChange={sliderChangeHandler}/>
    </div>

  )
}

export default Volume;