import React, {Component} from 'react';
import "./Chat.scss";
import io from 'socket.io-client';

class Chat extends Component {
  state = {}

  componentDidMount() {
    const socket = io('http://localhost:5000');
  }


  render() {
    console.log(this.props)
    return (
      <div className="chat-body">
        <div className="chat-users">
          <div className="user">
            <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />
            <h4>{this.props.userData.we.Mt.Ed}</h4>
          </div>
        </div>


        <div className="chat-messages-section">
          <div className="chat-messages-background">
            <div className="chat-messages">

              <div className="message-foreign">
                <div className="message-sender">

                  <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />

                </div>
                <div className="message-text">
                  Text from outsider
                  <p>{new Date().getUTCHours()}:{new Date().getUTCMinutes()} h</p>
                </div>
              </div>


              <div className="message-me">
                <div className="message-sender">
                  <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />
                </div>
                <div className="message-text">
                  My text
                  <p>{new Date().getUTCHours()}:{new Date().getUTCMinutes()} h</p>
                </div>
              </div>

            </div>
          </div>
          <div className="chat-input">
            <form id="form">
              <input id="input" autoComplete="off" /> <button className="input-btn">Send</button>
            </form>
          </div>
        </div>







        <div className="user-profile">
          <div className="user-signout">
            <button className="unselectable" /*onClick={this.props.onSignOutClick}*/>Sign Out</button>
          </div>

          <div className="user-image unselectable">
            <img src={this.props.userData.we.Mt.PK} />
          </div>
          <h3>{this.props.userData.we.Mt.Ed}</h3>
        </div>




      </div>
    );
  }
}

export default Chat;