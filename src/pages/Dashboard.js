import React, { useState, useEffect } from "react";
import Video from '../components/video/video/Video';
import './Dashboard.css';

const Dashboard = (props) => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/video/all`)
    .then(async res => {
      const json = await res.json();
      return {videos: json, status: res.status}
    })
    .then(resData => {
      if (resData.status === 200) {
        setVideos(resData.videos);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="browse--container">
      {videos?.map(video => {
        return (
          <Video data={video} state={props.state} key={video._id} />
        );
      })}
    </div>
  )
}

export default Dashboard;