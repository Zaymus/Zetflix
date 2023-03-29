import React, { Component } from 'react';
import Notification from './Notification';
import './NotificationList.css';



class NotificationList extends Component {
  state = {
    notifications: [],
    socket: null,
  }

  generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const len = chars.length;
    let result = '';

    for(let i = 0; i < 10; i++) {
      result += chars.charAt((Math.random() * len));
    }

    return result;
  }

  addNotification = (notification) => {
    this.setState({
      notifications: [...this.state.notifications, {...notification, id: this.generateId()}]
    });
  }

  removeNotification = (id) => {
    var array = [...this.state.notifications];
    var index = this.state.notifications.findIndex((notification) => {
      return notification.id === id;
    });

    if(index !== -1) {
      array.splice(index, 1);
      this.setState({notifications: array});
    }
  }

  componentDidUpdate() {
    if (this.props.socket) {
      if(!this.state.socket) {
        this.setState({socket: this.props.socket})
      }
  
      this.state.socket?.on('announcement', (notification) => {
        this.addNotification({
          ...notification,
          type: notification.type ? notification.type : 'announcement'
        });
      });
    }

    if (this.props.notification) {
      console.log(this.props.notification);
      this.addNotification({
        ...this.props.notification,
          type: this.props.notification.type ? this.props.notification.type : 'announcement'
      });
      this.props.removeNotification();
    }
  }

  render() {
    return (
      <div className="notificationList--container">
        {this.state.notifications.map((notification) => {
          return (
            <Notification 
              type={notification.type}
              key={notification.id}
              notiId={notification.id}
              removeNotification={this.removeNotification}
            >
              <h3 className="title">{notification.title}</h3>
              <span className="message">{notification.message}</span>
            </Notification>
          )
        })}
      </div>
    )
  }
}

export default NotificationList;