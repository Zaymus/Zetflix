import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Video from '../components/video/video/Video';
import './Dashboard.css';

const Dashboard = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/video/all")
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
          <Link to={`/video/${video._id}`} key={video._id}>
            <Video data={video} />
          </Link>
        );
      })}
    </div>
  )
}

export default Dashboard;