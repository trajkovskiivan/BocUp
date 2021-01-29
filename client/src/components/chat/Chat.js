import React, {Component} from 'react';
import "./Chat.scss";
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {createPrivateRoom, addPrivateMessage} from '../../actions/index';


import MainChat from './chatMessages/MainChat';
import PrivateChat from './chatMessages/PrivateChat';

class Chat extends Component {
  server = 'http://localhost:5000';

  constructor(props) {
    super(props);
    this.state = {
      sender: this.props.userData.ee.Es,
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
      this.socket.emit("fontEndConnected", {socketId, userData: this.props.userData.ee.Es});
    });
    this.socket.on("usersUpdated", (activeUsers) => {
      this.setState({activeUsers});
    });

    this.socket.on("createPrivateRoom", data => {
      console.log("Create private room   ", data)
      this.props.createPrivateRoom(data)
    });

    this.socket.on('privateMessage', data => {
      this.props.addPrivateMessage(data)
    })

    this.socket.on("heiWillDisconnect", msg => {
      console.log(msg)
    })
  };




  componentWillUnmount() {
    this.socket.emit("iWillDisconnect", {user: this.props.userData.wR, rooms: this.props.privateRooms})
    this.socket.disconnect();
  };

  requestPrivateRoom = (data) => {
    this.socket.emit("requestPrivateRoom", data)
  };

  terminateRoom = (data) => {
    let activeRooms = this.state.activeRooms.filter(room => room !== data);
    this.setState({activeRooms})
  }

  renderActiveUsers = (data) => {
    console.log(data)
    // eslint-disable-next-line
    return data.map(({userData, socketId}) => {
      if (this.state.socketId !== socketId)
        return (
          // <Link to={``}>
          <div onDoubleClick={() => {this.requestPrivateRoom(userData.wR);}} className="user" key={socketId}>
            <img src={userData.fI} alt={userData.sd} />
            <h4>{userData.sd}</h4>
          </div>
          // </Link>
        )
    });
  };



  setActiveRoom = (data) => {
    this.setState({activeChat: data})
  };

  renderChatLinks = (data) => {
    let map = new Map(Object.entries(data));
    // console.log(map)
    return map.forEach(entry => {
      return <li className="dummy-private-chat">
        <Link to={`private-chat-${entry.roomId}`}>New Room</Link>
      </li>
    })
  }



  render() {
    return (
      <div className="chat-body">


        <div className="chat-users">{this.state.activeUsers.length > 0 ? this.renderActiveUsers(this.state.activeUsers) : "Ola"}</div>


        <div className="chat-messages-section">
          <Router >

            <nav className="chat-navigation">
              <div className="main-chat">
                <h1 className=""><Link to="/">Main Chat</Link></h1>
              </div>
              <ul className="private-chat-list">
                {
                  this.props.privateRooms && this.props.privateRooms.map((room, index) => {
                    let who = room.users.filter(user => user.userData.wR !== this.props.userData.ee.Es.wR)[0]
                    console.log(who)
                    return <li key={index} className="dummy-private-chat" key={room.roomId}>
                      <Link to={`private-chat-${room.roomId}`}>{who.userData.sd}</Link>
                    </li>
                  })
                }
              </ul>
            </nav>

            <div className="chat-messages-background">
              <Switch>

                <Route exact path="/"><MainChat num="main" socket={this.socket} userData={this.props.userData.ee.Es} /></Route>
                {
                  this.props.privateRooms.map((room, index) => {
                    return (
                      <Route exact path={`/private-chat-${room.roomId}`}>
                        <PrivateChat key={index} roomData={room} messages={room.messages} socket={this.socket} userData={this.props.userData.ee.Es} />
                      </Route>
                    )
                  })
                }
              </Switch>
            </div>

          </Router>
        </div>




        <div className="user-profile">
          <div className="user-signout">
            <button className="unselectable" onClick={this.props.onSignOutClick}>Sign Out</button>
          </div>

          <div className="user-image unselectable">
            <img src={this.props.userData.ee.Es.fI} alt={this.props.userData.ee.Es.sd} />
            <h3>{this.props.userData.ee.Es.sd}</h3>
          </div>

          <div className="contacts-container">
            <h3>Contacts</h3>
            <ul className="contact-list">
              {/* <li className="contact">Contact 1</li>
              <li className="contact">Contact 2</li>
              <li className="contact">Contact 3</li>
              <li className="contact">Contact 4</li>
              <li className="contact">Contact 5</li> */}
            </ul>
          </div>
        </div>




      </div>
    );
  };

}


const mapStateToProps = (state) => {

  return {
    privateRooms: Object.values(state.privateRooms)
  }
}

export default connect(mapStateToProps, {createPrivateRoom, addPrivateMessage})(Chat);













{/* <div className="user">
            <img src={this.props.userData.ee.Es.PK} alt={this.props.userData.ee.Es.Ed} />
            <h4>{this.props.userData.ee.Es.Ed}</h4>
          </div> */}







{/* <div className="message-foreign">
                <div className="message-sender">
                  <img src={this.props.userData.ee.Es.PK} alt={this.props.userData.ee.Es.Ed} />
                </div>
                <div className="message-text">
                  Text from outsider
                  <p>{new Date().getUTCHours()}:{new Date().getUTCMinutes()} h</p>
                </div>
              </div>

              <div className="message-me">
                <div className="message-sender">
                  <img src={this.props.userData.ee.Es.PK} alt={this.props.userData.ee.Es.Ed} />
                </div>
                <div className="message-text">
                  My text
                  <p>{new Date().getUTCHours()}:{new Date().getUTCMinutes()} h</p>
                </div>
              </div> */}