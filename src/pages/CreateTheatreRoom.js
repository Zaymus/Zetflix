import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateTheatreRoom = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`https://octopus-app-yhikj.ondigitalocean.app/api/theatre/create`, {
      method: "POST",
      headers: {
        'authorization': `bearer ${props.state.token}`,
      },
    })
    .then(async res => {
      return {data: await res.json(), status: res.status}
    })
    .then(resData => {
      if(resData.status === 201) {
        const videoId = location.search.split("=")[1];
        const url = `/theatre-room/${resData.data._id}/video/${videoId}`;
        navigator.clipboard.writeText(`http://localhost:3000${url}`);
        props.onNotification({title: "Link Copied", type: "success", message: "Invite link copied to clipboard."});
        navigate(url);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, [navigate, location, props])

  return(<></>);
}

export default CreateTheatreRoom;