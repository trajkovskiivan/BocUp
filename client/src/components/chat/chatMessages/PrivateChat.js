import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPrivateMessage} from '../../../actions';

class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: "",
      messageReady: "",
      messages: this.props.thisRoom.messages,
      sender: this.props.userData,
      receiver: {}
    }
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.roomData) {
      this.setState({receiver: this.props.roomData.users.filter(user => user.userData.wR !== this.props.userData.wR)[0].userData})
    }
  };




  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let sender = this.props.userData.wR;
    let receiver = this.props.roomData.users.filter(user => user.userData.wR !== this.props.userData.wR)[0].userData.wR;
    let receiverSocket = this.props.roomData.users.filter(user => user.userData.wR !== this.props.userData.wR)[0].socketId;
    this.props.socket.emit("privateMessage", {message: this.state.messageInput, receiver: receiver, sender: sender, room: this.props.roomData.roomId, receiverSocket: receiverSocket});
    this.props.addPrivateMessage({message: this.state.messageInput, receiver: receiver, sender: sender, room: this.props.roomData.roomId})

    this.setState({messageInput: ""});
  };




  render() {
    return (
      <React.Fragment>
        <div className="chat-messages" >
          Wellcome to room: {this.props.roomData.roomId}
          <pre>Me: {this.props.userData.sd}</pre>
          <br />
          <pre>Receiver: {this.props.roomData.users.filter(user => user.userData.wR !== this.props.userData.wR)[0].userData.sd}</pre>
          {this.props.thisRoom.messages.map(({message, sender}, index) => {
            let date = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} h`
            let who = sender === this.props.userData.wR ? "me" : "foreign";
            let from = sender === this.props.userData.wR ? this.state.sender : this.state.receiver;

            console.log(sender)
            return (
              <div key={index} className={`message-${who}`}>

                <div className="message-sender">
                  <img src={from.fI} alt={from.bT} />
                </div>
                <div className="message-text">
                  <span className="text-paragraph">{message}</span>
                  <p className="date-paragraph">{date}</p>
                  {/* <span>nams</span> */}
                </div>

              </div>

            )
          })}
        </div >



        <div className="chat-input">
          <form id="form" onSubmit={(e) => this.handleSubmit(e)}>
            <input
              name="messageInput"
              value={this.state.messageInput}
              // value={this.props.num}
              onChange={(e) => this.handleInput(e)}
              id="input"
              autoComplete="off"
            />
            <button className="input-btn">Send</button>
          </form>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    thisRoom: Object.values(state.privateRooms).filter(room => room.roomId === ownProps.roomData.roomId)[0]
  }
}

export default connect(mapStateToProps, {addPrivateMessage})(PrivateChat);