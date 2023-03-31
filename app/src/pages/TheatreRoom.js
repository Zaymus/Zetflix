import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from '../components/video/VideoPlayer';
import Chat from '../components/chat/Chat';
import openSocket from 'socket.io-client';
import './TheatreRoom.css';

const TheatreRoom = (props) => {
  const { roomId, videoId } = useParams();

  const [state, setState] = useState({captions: null, disconnect: false});
  const { socket, setSocket } = props;
  
  useEffect(() => {
    if(!state.captions) {
      fetch(`http://localhost:9000/api/caption/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(async response => {
      return {data: await response.json(), status: response.status};
    })
    .then(jsonData => {
      if(jsonData.status === 200) {
        setState((prevState) => {
          return {...prevState, captions: jsonData}
        });
      } else {
        setState((prevState) => {
          return {...prevState, captions: 1}
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
    }
  }, [roomId, videoId, props, state]);

  useEffect(() => {
    if(!socket) {
      const newSocket = openSocket("http://localhost:9000", {transports:["websocket"]});
      newSocket.emit('room.join', {roomId: roomId, userId: localStorage.getItem('userId')});
      setSocket(newSocket);
    }
  }, [roomId, socket, setSocket]);


  useEffect(() => {
    return () => {
      props.socket?.emit('room.leave', {roomId: roomId, userId: localStorage.getItem("userId")});
    }
  }, [roomId, props.socket])

  useEffect(() => {
    return () => {
      setState((prevState) => {
        return {
          ...prevState,
          disconnect: true,
        }
      })
    }
  }, [])

  return (
    <div className='room--container'>
      <VideoPlayer videoId={videoId} captions={state.captions} room={roomId} socket={props.socket} />
      <Chat roomId={roomId} socket={props.socket}/>
    </div>
  );
}

export default TheatreRoom;