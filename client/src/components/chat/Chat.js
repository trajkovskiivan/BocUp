import React, {Component} from 'react';
import "./Chat.scss";
import io from 'socket.io-client';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageInput: "",
      sender: this.props.userData.we.Mt,
      socketId: "",
      messageReady: "",
      activeUsers: []
    }
  }


  componentDidMount() {
    this.socket = io('http://localhost:5000');

    // this.socket.on("connection");

    this.socket.on("socketConnected", ({activeUsers, socketId}) => {
      // console.log(activeUsers)
      // console.log(socketId)
      this.setState({
        activeUsers,
        socketId
      });
      this.socket.emit("fontEndConnected", {socketId, userData: this.props.userData.we.Mt});
    });
    this.socket.on("usersUpdated", (activeUsers) => {
      console.log("Active Users  ", activeUsers);
      delete activeUsers[this.state.socketId];
      this.setState({
        activeUsers: activeUsers
      });
    });



    // this.socket.emit("newUser", this.props.userData.we.Mt);
    // this.socket.on("welcome", data => this.renderNewUser(data));

    this.socket.on("message", (data) => {
      console.log(data);
      let date = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} h`
      let from = data.sender.OU === this.props.userData.we.Ea ? "me" : "foreign";
      let msg = document.createElement("div");
      msg.classList.add(`message-${from}`);
      msg.innerHTML = `
      <div class="message-sender">
      <img src=${data.sender.PK} alt=${data.sender.qW} />

      </div>
      <div class="message-text">
        <span class="text-paragraph">${data.message}<span/>
        <p class="date-paragraph">${date}</p>
      </div>`;
      document.querySelector('.chat-messages').appendChild(msg)
    });
  };


  componentDidUpdate(prevProps, prevState) {

    if (prevState.messageReady !== this.state.messageReady) {
      console.log(`State has been changed prev ${prevState.messageReady} curr ${this.state.messageReady}`);
      this.socket.emit("message", {sender: this.state.sender, message: this.state.messageReady});
    }
  };

  componentWillUnmount() {
    this.socket.disconnect();
  };



  renderActiveUsers = (data) => {
    // Object.entries(data).map(([keys, values], index) => {

    //   const newUser = document.createElement('div');
    //   newUser.classList.add("user");
    //   newUser.innerHTML = `
    //   <img src=${values.userData.PK} alt={${values.userData.Ed}} />
    //   <h4>${values.userData.Ed}</h4>`;
    //   document.querySelector(".chat-users").appendChild(newUser)
    // })
  }




  renderNewUser = (data) => {
    // console.log(data)
    const newUser = document.createElement('div');
    newUser.classList.add("user");
    newUser.innerHTML = `
    <img src=${data.PK} alt={${data.Ed}} />
    <h4>${data.Ed}</h4>`;
    document.querySelector(".chat-users").appendChild(newUser)
  };

  renderMessage = (data) => { };


  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      messageReady: this.state.messageInput,
      messageInput: ""
    });
  };


  render() {
    // console.log('The props', this.props)
    // console.log("Users", this.state.allUsers)
    // Object.entries(this.state.allUsers).map()
    // console.log("Active users:   ", this.state.activeUsers)
    // this.renderActiveUsers(this.state.activeUsers)
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
            <form id="form" onSubmit={(e) => this.handleSubmit(e)}>
              <input
                name="messageInput"
                value={this.state.messageInput}
                onChange={(e) => this.handleInput(e)}
                id="input"
                autoComplete="off"
              />
              <button className="input-btn">Send</button>
            </form>
          </div>
        </div>







        <div className="user-profile">
          <div className="user-signout">
            <button className="unselectable" onClick={this.props.onSignOutClick}>Sign Out</button>
          </div>

          <div className="user-image unselectable">
            <img src={this.props.userData.we.Mt.PK} alt={this.props.userData.we.Mt.Ed} />
          </div>
          <h3>{this.props.userData.we.Mt.Ed}</h3>
        </div>




      </div>
    );
  };


}

export default Chat;