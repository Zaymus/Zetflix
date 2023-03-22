import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import Chat from '../components/chat/Chat';
import NotificationList from '../components/ui/Notification/NotificationList';
import openSocket from 'socket.io-client';
import './TheatreRoom.css';

class TheatreRoom extends Component {
  state = {
    socket: null,
    captions: "",
  }

  componentDidMount() {
    const socket = openSocket("http://localhost:9000", {transports:["websocket"]});
    socket.emit('room.join', {roomId: this.props.roomId, userId: localStorage.getItem('userId')});
    this.setState({socket: socket});

    fetch(`http://localhost:9000/api/caption/${this.props.videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      this.setState({captions: jsonData});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className='room--container'>
        <VideoPlayer videoId={this.props.videoId} captions={this.state.captions} room={this.props.roomId} socket={this.state.socket} />
        <Chat roomId={this.props.roomId} socket={this.state.socket}/>
        <NotificationList socket={this.state.socket}/>
      </div>
    );
  }
}

export default TheatreRoom;