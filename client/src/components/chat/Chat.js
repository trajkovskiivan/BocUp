import React, {Component} from 'react';
import "./Chat.scss";
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {createPrivateRoom, addPrivateMessage} from '../../actions/index';


import MainChat from './chatMessages/MainChat';
import PrivateChat from './chatMessages/PrivateChat';

class Chat extends Component {
  server = 'http://localhost:5000';

  constructor(props) {
    super(props);
    this.state = {
      sender: this.props.userData.we.Mt,
      socketId: "",
      activeUsers: [],
      activeRooms: [],
      activeChat: "",
      chatRoom: ""
    }
  };


  componentDidMount() {
    this.socket = io(this.server);

    this.socket.on("socketConnected", ({activeUsers, socketId}) => {
      this.setState({
        activeUsers,
        socketId
      });
      this.socket.emit("fontEndConnected", {socketId, userData: this.props.userData.we.Mt});
    });
    this.socket.on("usersUpdated", (activeUsers) => {
      this.setState({activeUsers});
    });

    this.socket.on("createPrivateRoom", data => {
      console.log(data)
      // console.log(`So you want to create room ${data.roomId} with ${data.users[0].userData.Ed} and ${data.users[1].userData.Ed}`);
      this.props.createPrivateRoom(data)
    });

    this.socket.on('privateMessage', data => {
      console.log("recieved Private Message", data)
      this.props.addPrivateMessage(data)
    })
  };




  componentWillUnmount() {
    this.socket.disconnect();
  };

  requestPrivateRoom = (data) => {
    this.socket.emit("requestPrivateRoom", data)
  };
  // createPrivateRoom = (data) => {
  //   let activeRooms = [...this.state.activeRooms, data];
  //   this.setState({activeRooms})
  // }
  terminateRoom = (data) => {
    let activeRooms = this.state.activeRooms.filter(room => room !== data);
    this.setState({activeRooms})
  }

  renderActiveUsers = (data) => {
    return data.map(({userData, socketId}) => {
      if (this.state.socketId !== socketId)
        return (
          <div onDoubleClick={() => this.requestPrivateRoom(userData.OU)} className="user" key={socketId}>
            <img src={userData.PK} alt={userData.Ed} />
            <h4>{userData.Ed}</h4>
          </div>
        )
    });
  };

  renderContacts = (data) => {
    // data.map(contact => {return <li></li>})
  };

  setActiveRoom = (data) => {
    this.setState({activeChat: data})
  }



  render() {
    console.log(this.state.activeChat);
    // console.log(this.state.activeRooms)
    // console.log(this.props.privateRooms[0].roomId)
    return (
      <div className="chat-body">

        <div className="chat-users">{this.state.activeUsers.length > 0 ? this.renderActiveUsers(this.state.activeUsers) : "Ola"}</div>


        <div className="chat-messages-section">
          <Router>
            <nav className="chat-navigation">
              <div className="main-chat">
                <h1 className=""><Link to="/">Main Chat</Link></h1>
              </div>
              <ul className="private-chat-list">
                {this.props.privateRooms && this.props.privateRooms.map(room => {
                  return <li className="dummy-private-chat" key={room.roomId}>
                    {/* <button onClick={() => this.setActiveRoom(room.roomId)}>{room.roomId}</button> */}
                    <Link to={`private-chat-${room.roomId}`}>New Room</Link>
                    {/* <Link to={`private-chat-${room.roomId}`}>{room.users[1]}</Link> */}
                  </li>
                })}
              </ul>
            </nav>

            <div className="chat-messages-background">
              <Switch>
                <Route exact path="/"><MainChat num="main" socket={this.socket} userData={this.props.userData.we.Mt} /></Route>
                {/* <MainChat num="main" socket={this.socket} userData={this.props.userData.we.Mt} />
                <PrivateChat key={this.state.activeChat} roomData={this.state.activeChat} socket={this.socket} userData={this.props.userData.we.Mt} /> */}
                {this.props.privateRooms.map(room => {
                  return (
                    <Route path={`/private-chat-${room.roomId}`}>
                      <PrivateChat key={room.roomId} roomData={room} socket={this.socket} userData={this.props.userData.we.Mt} />
                    </Route>
                  )
                })}
              </Switch>
            </div>

          </Router>

        </div>




        <div className="user-profile">
          <div className="user-signout">
            <button className="unselectable" onClick={this.props.onSignOutClick}>Sign Out</button>
          </div>

          <div className="user-image unselectable">
            <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />
            <h3>{this.props.userData.we.Mt.Ed}</h3>
          </div>

          <div className="contacts-container">
            <h3>Contacts</h3>
            <ul className="contact-list">
              <li className="contact">Contact 1</li>
              <li className="contact">Contact 2</li>
              <li className="contact">Contact 3</li>
              <li className="contact">Contact 4</li>
              <li className="contact">Contact 5</li>
            </ul>
          </div>

        </div>




      </div>
    );
  };

}


const mapStateToProps = (state) => {

  return {
    privateRooms: state.privateRooms
  }
}

export default connect(mapStateToProps, {createPrivateRoom, addPrivateMessage})(Chat);













{/* <div className="user">
            <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />
            <h4>{this.props.userData.we.Mt.Ed}</h4>
          </div> */}







{/* <div className="message-foreign">
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
              </div> */}