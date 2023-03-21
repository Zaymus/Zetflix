import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';

class Video extends Component {
  state = {
    captions: "",
  }

  componentDidMount() {
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
      <div>
        <VideoPlayer 
          videoId={this.props.videoId}
          captions={this.state.captions}
        />
      </div>
    );
  }
}

export default Video;