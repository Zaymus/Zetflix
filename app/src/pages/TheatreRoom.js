import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from '../components/video/VideoPlayer';
import Chat from '../components/chat/Chat';
import NotificationList from '../components/ui/Notification/NotificationList';
import openSocket from 'socket.io-client';
import './TheatreRoom.css';

const TheatreRoom = () => {
  const { roomId, videoId } = useParams();

  const [state, setState] = useState({socket: null, captions: ""});


  useEffect(() => {
    const socket = openSocket("http://localhost:9000", {transports:["websocket"]});
    socket.emit('room.join', {roomId: roomId, userId: localStorage.getItem('userId')});
    setState((prevState) => {
      return {
        ...prevState,
        socket: socket,
      }
    });

    fetch(`http://localhost:9000/api/caption/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      setState((prevState) => {
        return {...prevState, captions: jsonData}
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, [roomId, videoId]);

  return (
    <div className='room--container'>
      <VideoPlayer videoId={videoId} captions={state.captions} room={roomId} socket={state.socket} />
      <Chat roomId={roomId} socket={state.socket}/>
      <NotificationList socket={state.socket}/>
    </div>
  );
}

export default TheatreRoom;