import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.onLogout();
    navigate("/");
  }, [props, navigate]);

  return (<></>);
}

export default Logout;