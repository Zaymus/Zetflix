import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import Chat from '../components/chat/Chat';
// import { socket } from '../util/socket';
import openSocket from 'socket.io-client';
import './TheatreRoom.css';

const TheatreRoom = (props) => {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(socket === null) {
      setSocket(openSocket("http://localhost:9000", {transports:["websocket"]}));
    }

    if(socket) {
      socket.emit('room.join', {roomId: props.roomId, userId: "64066123269b0611c1872182"});
    }
  }, [socket, props.roomId]);
  
  const [captions, setCaptions] = useState("");

  if(!captions) {
    fetch(`http://localhost:9000/api/caption/${props.videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      setCaptions(jsonData);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className='room--container'>
      <VideoPlayer videoId={props.videoId} captions={captions}/>
      <Chat roomId={props.roomId} socket={socket}/>
    </div>
  );
}

export default TheatreRoom;