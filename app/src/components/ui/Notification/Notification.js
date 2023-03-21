import React, { Component } from 'react';
import './Notification.css';


class Notification extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.removeNotification(this.props.notiId);
    }, 5000);
  }

  render() {
    return (
      <div id={this.props.notiId} className={`notification--container ${this.props.type}`}>
        <div className="notification--wrapper">
          {this.props.children}
        </div>
        <span className="duration"></span>
      </div>
    );
  }
}

export default Notification;