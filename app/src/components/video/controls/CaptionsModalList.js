import React from 'react';
import CaptionsModalItem from './CaptionsModalItem';
import {WebVTTParser} from 'webvtt-parser';

const CaptionsModalList = (props) => {
  const tracks = Array.from(document.querySelectorAll("track"));
  
  const captionClickHandler = (event) => {
    const parser = new WebVTTParser();
    var track = event.target;
    if (track.nodeName !== "DIV") {
      track = event.target.parentNode;
    }
    props.setSelected(track.getAttribute("data-key"));

    const caption = props.videoRef.current.addTextTrack("subtitles", track.getAttribute("data-language"), "en");
    caption.mode = "showing";

    fetch(`http://localhost:9000/api/caption/?captionKey=${track.getAttribute("data-key")}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    })
    .then(jsonData => {
      const cueTree = parser.parse(jsonData.captions).cues;
      cueTree.forEach((cue) => {
        caption.addCue(new VTTCue(cue.startTime, cue.endTime, cue.text));
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='caption-languages'>
      {tracks.map((track) => {
        return <CaptionsModalItem 
        language={track.getAttribute("label")} 
        selected={props.selected === track.getAttribute('data-key')}
        onClick={captionClickHandler}
        data-key={track.getAttribute("data-key")}
        key={track.getAttribute("data-key")}
      />
      })}
    </div>
  )
}

export default CaptionsModalList;